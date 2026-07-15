export type { IconDefinition, IconSize, IconSizeToken, IconSizeAlias } from './types.js';
export { ICON_SIZE_PX, resolveIconSize, iconSizeToPx } from './types.js';
export {
  IconRegistry,
  defaultIconRegistry,
  registerIcons,
  getIcon,
  toSvgElement,
} from './registry.js';
export { allIcons } from './icons/index.js';
export * from './icons/index.js';
