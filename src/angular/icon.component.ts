import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { defaultIconRegistry, toSvgElement } from '../registry.js';
import { ICON_SIZE_PX, type IconSize } from '../types.js';
import { IconService } from './icon.service.js';

@Component({
  selector: 'lib-icon, mbbiz-icon',
  standalone: true,
  template: `<span
    class="lib-icon"
    [class.lib-icon--sm]="size() === 'sm'"
    [class.lib-icon--md]="size() === 'md'"
    [class.lib-icon--lg]="size() === 'lg'"
    [attr.role]="ariaLabel() ? 'img' : null"
    [attr.aria-label]="ariaLabel()"
    [attr.aria-hidden]="ariaLabel() ? null : 'true'"
    [style.color]="color()"
    [innerHTML]="safeSvg()"
  ></span>`,
  styles: [
    `
      .lib-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        line-height: 0;
        color: inherit;
      }
      .lib-icon svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      .lib-icon--sm {
        width: 16px;
        height: 16px;
      }
      .lib-icon--md {
        width: 20px;
        height: 20px;
      }
      .lib-icon--lg {
        width: 24px;
        height: 24px;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly name = input.required<string>();
  readonly size = input<IconSize>('md');
  readonly color = input<string>('currentColor');
  readonly ariaLabel = input<string | null>(null);

  private readonly sanitizer = inject(DomSanitizer);
  private readonly iconService = inject(IconService, { optional: true });

  protected readonly safeSvg = computed(() => {
    const registry = this.iconService?.registry ?? defaultIconRegistry;
    const def = registry.get(this.name());
    if (!def) {
      console.warn(`[lib-icon] Unknown icon: "${this.name()}"`);
      return '';
    }

    const px = ICON_SIZE_PX[this.size()];
    const html = toSvgElement(def, {
      width: String(px),
      height: String(px),
    });
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });
}
