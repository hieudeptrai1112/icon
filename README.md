# @mbbiz/icon

SVG icon library — **no IcoMoon, no Ant Design icons**.

Pipeline:

```
icons/raw/*.svg  →  npm run icons:generate  →  src/icons/*.ts  →  <mbiz-icon>
```

## Install

```bash
npm install @mbbiz/icon
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
import { registerIcons, NavHomeIcon, ActionPlusIcon, toSvgElement } from '@mbbiz/icon';

registerIcons(NavHomeIcon, ActionPlusIcon);

const html = toSvgElement(NavHomeIcon);
```

Register **only icons you need** — do not import `allIcons` in production apps.

## Usage (Angular)

```ts
// app.config.ts
import { provideIcons } from '@mbbiz/icon/angular';
import { NavHomeIcon, ActionSearchIcon } from '@mbbiz/icon';

export const appConfig = {
  providers: [
    provideIcons([NavHomeIcon, ActionSearchIcon]),
  ],
};
```

```html
<mbiz-icon name="nav-home" size="m" />
<mbiz-icon name="action-search" size="s" ariaLabel="Search" />
<mbiz-icon name="abold_error" size="m" color="#f53f3f" />
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

### Color (same model as ng-zorro)

SVG paths use `currentColor`. The host sets CSS `color` via the `color` input (default `currentColor`) or by inheriting from a parent.

```html
<!-- Inherit from parent -->
<button style="color: #1677ff">
  <mbiz-icon name="action-plus" size="s" />
  Add
</button>

<!-- Explicit prop -->
<mbiz-icon name="abold_error" size="m" color="#f53f3f" />
<mbiz-icon name="abold_success" size="m" color="var(--semantic-color-success)" />
```

```css
.icon-muted {
  color: var(--semantic-color-text-secondary);
}
```

Do **not** hard-code hex fills in raw SVG if the icon must recolor — the generate script rewrites non-`none`/`currentColor` fills to `currentColor`.

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
