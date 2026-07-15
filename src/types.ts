/** Matches design-token scale: iconsize/xs|s|m|l|xl|2xl */
export type IconSizeToken = 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl';

/** @deprecated Prefer xs|s|m|l|xl|2xl — kept for early API compatibility */
export type IconSizeAlias = 'sm' | 'md' | 'lg';

export type IconSize = IconSizeToken | IconSizeAlias;

export interface IconDefinition {
  /** kebab-case name, e.g. "nav-home" */
  name: string;
  /** SVG viewBox, e.g. "0 0 24 24" */
  viewBox: string;
  /** Inner SVG markup (paths, etc.) — no outer <svg> */
  svg: string;
  category?: string;
  tags?: readonly string[];
}

/**
 * iconsize token scale (from docs/tokens/naming-map-v1.json)
 *
 * | Token        | Value |
 * |--------------|-------|
 * | iconsize/xs  | 16px  |
 * | iconsize/s   | 20px  |
 * | iconsize/m   | 24px  |
 * | iconsize/l   | 28px  |
 * | iconsize/xl  | 32px  |
 * | iconsize/2xl | 40px  |
 */
export const ICON_SIZE_PX: Record<IconSizeToken, number> = {
  xs: 16,
  s: 20,
  m: 24,
  l: 28,
  xl: 32,
  '2xl': 40,
};

const SIZE_ALIASES: Record<IconSizeAlias, IconSizeToken> = {
  sm: 'xs',
  md: 's',
  lg: 'm',
};

export function resolveIconSize(size: IconSize): IconSizeToken {
  if (size in SIZE_ALIASES) {
    return SIZE_ALIASES[size as IconSizeAlias];
  }
  return size as IconSizeToken;
}

export function iconSizeToPx(size: IconSize): number {
  return ICON_SIZE_PX[resolveIconSize(size)];
}
