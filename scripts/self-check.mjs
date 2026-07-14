import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(join(root, 'icons/manifest.json'), 'utf8'));

assert.ok(manifest.length >= 6, 'expected at least 6 sample icons');
for (const icon of manifest) {
  assert.ok(icon.name, 'name required');
  assert.ok(icon.viewBox, 'viewBox required');
  assert.match(icon.name, /^[a-z0-9]+(-[a-z0-9]+)*$/, `bad name: ${icon.name}`);
}

const { NavHomeIcon, getIcon, registerIcons, toSvgElement } = await import('../dist/index.js');

registerIcons(NavHomeIcon);
assert.equal(getIcon('nav-home')?.name, 'nav-home');
const svg = toSvgElement(NavHomeIcon);
assert.ok(svg.includes('<svg'));
assert.ok(svg.includes('viewBox='));

console.log('ok —', manifest.length, 'icons');
