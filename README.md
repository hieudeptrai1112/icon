# @hieultra/icon

SVG icon library — **no IcoMoon, no Ant Design icons**.

Pipeline:

```
icons/raw/*.svg  →  npm run icons:generate  →  src/icons/*.ts  →  <lib-icon>
```

## Install

```bash
npm install @hieultra/icon
# or link locally / git:
# npm install github:hieudeptrai1112/icon
```

## Add icons

1. Drop SVG into `icons/raw/` — naming: `ic-{domain}-{name}.svg`
   - Example: `ic-nav-home.svg` → icon name `nav-home`
2. Run:

```bash
npm run icons:generate
npm run build
```

Rules for SVG:

- Prefer `viewBox="0 0 24 24"`
- Use `currentColor` for stroke/fill (script rewrites hard-coded colors)
- Keep paths only — no filters/effects unless needed

## Usage (core)

```ts
import { registerIcons, NavHomeIcon, ActionPlusIcon, toSvgElement } from '@hieultra/icon';

registerIcons(NavHomeIcon, ActionPlusIcon);

const html = toSvgElement(NavHomeIcon);
```

Register **only icons you need** — do not import `allIcons` in production apps.

## Usage (Angular)

```ts
// app.config.ts
import { provideIcons } from '@hieultra/icon/angular';
import { NavHomeIcon, ActionSearchIcon } from '@hieultra/icon';

export const appConfig = {
  providers: [
    provideIcons([NavHomeIcon, ActionSearchIcon]),
  ],
};
```

```html
<lib-icon name="nav-home" size="m" />
<lib-icon name="action-search" size="s" ariaLabel="Search" />
```

Alias selector: `<mbbiz-icon>` also works.

### Icon size tokens (`iconsize/*`)

| Token | Prop `size` | px |
|---|---|---|
| `iconsize/xs` | `xs` | 16 |
| `iconsize/s` | `s` | 20 |
| `iconsize/m` | `m` (**default**) | 24 |
| `iconsize/l` | `l` | 28 |
| `iconsize/xl` | `xl` | 32 |
| `iconsize/2xl` | `2xl` | 40 |

Legacy aliases: `sm`→`xs`, `md`→`s`, `lg`→`m`.

## Project layout

```
icons/raw/           # source of truth (SVG from Figma)
icons/manifest.json  # generated metadata
scripts/generate.mjs
src/
  types.ts
  registry.ts
  icons/             # generated definitions
  angular/           # IconComponent + provideIcons
```

## Sample icons included

| Name | File |
|---|---|
| `nav-home` | `ic-nav-home.svg` |
| `nav-arrow-right` | `ic-nav-arrow-right.svg` |
| `action-plus` | `ic-action-plus.svg` |
| `action-close` | `ic-action-close.svg` |
| `action-search` | `ic-action-search.svg` |
| `action-edit` | `ic-action-edit.svg` |

## License

MIT
