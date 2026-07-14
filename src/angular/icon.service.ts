import { Injectable } from '@angular/core';

import { IconRegistry, defaultIconRegistry } from '../registry.js';
import type { IconDefinition } from '../types.js';

@Injectable({ providedIn: 'root' })
export class IconService {
  /** Shared registry (same as core defaultIconRegistry). */
  readonly registry: IconRegistry = defaultIconRegistry;

  register(...icons: IconDefinition[]): void {
    this.registry.register(...icons);
  }

  get(name: string): IconDefinition | undefined {
    return this.registry.get(name);
  }
}
