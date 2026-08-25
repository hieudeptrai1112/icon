import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import {
  defaultIconRegistry,
  iconSizeToPx,
  resolveIconSize,
  toSvgElement,
  type IconSize,
} from '@mbbiz/icon';
import { IconService } from './icon.service';

@Component({
  selector: 'mbiz-icon, mbbiz-icon',
  standalone: true,
  template: `<span
    class="mbiz-icon"
    [class.mbiz-icon--xs]="resolvedSize() === 'xs'"
    [class.mbiz-icon--s]="resolvedSize() === 's'"
    [class.mbiz-icon--m]="resolvedSize() === 'm'"
    [class.mbiz-icon--l]="resolvedSize() === 'l'"
    [class.mbiz-icon--xl]="resolvedSize() === 'xl'"
    [class.mbiz-icon--2xl]="resolvedSize() === '2xl'"
    [attr.role]="ariaLabel() ? 'img' : null"
    [attr.aria-label]="ariaLabel()"
    [attr.aria-hidden]="ariaLabel() ? null : 'true'"
    [style.color]="color()"
    [innerHTML]="safeSvg()"
  ></span>`,
  styles: [
    `
      .mbiz-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        line-height: 0;
        color: inherit;
      }
      .mbiz-icon svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      .mbiz-icon--xs {
        width: 16px;
        height: 16px;
      }
      .mbiz-icon--s {
        width: 20px;
        height: 20px;
      }
      .mbiz-icon--m {
        width: 24px;
        height: 24px;
      }
      .mbiz-icon--l {
        width: 28px;
        height: 28px;
      }
      .mbiz-icon--xl {
        width: 32px;
        height: 32px;
      }
      .mbiz-icon--2xl {
        width: 40px;
        height: 40px;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly name = input.required<string>();
  /** Token size: xs|s|m|l|xl|2xl (default m = 24px). Aliases sm→xs, md→s, lg→m. */
  readonly size = input<IconSize>('m');
  readonly color = input<string>('currentColor');
  readonly ariaLabel = input<string | null>(null);

  private readonly sanitizer = inject(DomSanitizer);
  private readonly iconService = inject(IconService, { optional: true });

  protected readonly resolvedSize = computed(() => resolveIconSize(this.size()));

  protected readonly safeSvg = computed(() => {
    const registry = this.iconService?.registry ?? defaultIconRegistry;
    const def = registry.get(this.name());
    if (!def) {
      console.warn(`[mbiz-icon] Unknown icon: "${this.name()}"`);
      return '';
    }

    const px = iconSizeToPx(this.size());
    const html = toSvgElement(def, {
      width: String(px),
      height: String(px),
    });
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });
}
