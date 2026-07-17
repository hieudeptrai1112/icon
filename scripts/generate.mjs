/**
 * Generate IconDefinition modules from icons/raw/*.svg
 *
 * Naming:
 *   ic-nav-home.svg  →  name: "nav-home", export: NavHomeIcon
 *   action-edit.svg  →  name: "action-edit", export: ActionEditIcon
 */

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(import.meta.url), '..', '..');
const rawDir = join(root, 'icons', 'raw');
const outDir = join(root, 'src', 'icons');
const manifestPath = join(root, 'icons', 'manifest.json');

function toKebabName(fileName) {
  return basename(fileName, '.svg')
    .replace(/^ic-/, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function toExportName(kebab) {
  const pascal = kebab
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('');
  return `${pascal}Icon`;
}

function extractViewBox(svg) {
  const match = svg.match(/viewBox=["']([^"']+)["']/i);
  return match?.[1] ?? '0 0 24 24';
}

function extractInnerSvg(svg) {
  // Strip XML/DOCTYPE noise and outer <svg>
  let body = svg
    .replace(/<\?xml[^>]*>/gi, '')
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .trim();

  const open = body.match(/<svg[^>]*>/i);
  const close = body.lastIndexOf('</svg>');
  if (!open || close === -1) {
    throw new Error('Invalid SVG: missing <svg> root');
  }

  body = body.slice(open[0].length, close).trim();

  // Prefer currentColor for theming
  body = body
    .replace(/\sfill=["'](?!none|currentColor)[^"']*["']/gi, ' fill="currentColor"')
    .replace(/\sstroke=["'](?!none|currentColor)[^"']*["']/gi, ' stroke="currentColor"');

  return body;
}

function categoryFromName(name) {
  const [prefix] = name.split('-');
  return prefix || 'general';
}

function main() {
  mkdirSync(outDir, { recursive: true });

  const files = readdirSync(rawDir)
    .filter((f) => f.endsWith('.svg'))
    .sort();

  if (files.length === 0) {
    console.warn('No SVG files found in icons/raw/');
    return;
  }

  const manifest = [];
  const exports = [];

  for (const file of files) {
    const raw = readFileSync(join(rawDir, file), 'utf8');
    const name = toKebabName(file);
    const exportName = toExportName(name);
    const viewBox = extractViewBox(raw);
    const svg = extractInnerSvg(raw);
    const category = categoryFromName(name);

    const ts = `import type { IconDefinition } from '../types';

export const ${exportName}: IconDefinition = {
  name: ${JSON.stringify(name)},
  viewBox: ${JSON.stringify(viewBox)},
  svg: ${JSON.stringify(svg)},
  category: ${JSON.stringify(category)},
};
`;

    writeFileSync(join(outDir, `${name}.ts`), ts, 'utf8');

    exports.push({ name, exportName, file: `./${name}` });
    manifest.push({
      name,
      file,
      exportName,
      viewBox,
      category,
    });
  }

  const index = `import type { IconDefinition } from '../types';
${exports.map((e) => `import { ${e.exportName} } from '${e.file}';`).join('\n')}

export {
${exports.map((e) => `  ${e.exportName}`).join(',\n')}
};

/** All generated icons — prefer registering only what you need. */
export const allIcons: IconDefinition[] = [
${exports.map((e) => `  ${e.exportName}`).join(',\n')}
];
`;

  writeFileSync(join(outDir, 'index.ts'), index, 'utf8');
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

  console.log(`Generated ${files.length} icons → src/icons/`);
}

main();
