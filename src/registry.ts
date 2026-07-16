import type { IconDefinition } from './types';

export class IconRegistry {
  private readonly icons = new Map<string, IconDefinition>();

  register(...defs: IconDefinition[]): void {
    for (const def of defs) {
      if (!def.name) {
        throw new Error('IconDefinition.name is required');
      }
      this.icons.set(def.name, def);
    }
  }

  get(name: string): IconDefinition | undefined {
    return this.icons.get(name);
  }

  has(name: string): boolean {
    return this.icons.has(name);
  }

  list(): IconDefinition[] {
    return [...this.icons.values()];
  }

  clear(): void {
    this.icons.clear();
  }
}

/** Shared singleton for framework adapters */
export const defaultIconRegistry = new IconRegistry();

export function registerIcons(...defs: IconDefinition[]): void {
  defaultIconRegistry.register(...defs);
}

export function getIcon(name: string): IconDefinition | undefined {
  return defaultIconRegistry.get(name);
}

export function toSvgElement(
  def: IconDefinition,
  attrs: Record<string, string> = {},
): string {
  const attrStr = Object.entries({
    viewBox: def.viewBox,
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    focusable: 'false',
    ...attrs,
  })
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');

  return `<svg ${attrStr}>${def.svg}</svg>`;
}
