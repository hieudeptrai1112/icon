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

export type IconSize = 'sm' | 'md' | 'lg';

export const ICON_SIZE_PX: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};
