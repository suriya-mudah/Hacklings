# Styles and Custom Styling (Hacklings)

## Purpose
Clear, concise reference for where theme tokens live and how to apply custom styling in components and when overriding Angular Material.

## Files of interest
- `src/styles/styles.theme.scss` — seed colors, SCSS tokens and exported CSS variables (runtime seeds).
- `src/styles/custom-theme.scss` — composes the Material theme via `@include mat.theme(...)` (light and optional dark variants).
- `src/styles.scss` — global entry point; imports theme files and `fonts.scss` and is included in builds.

## Custom (runtime) CSS variables — quick reference (priority)

The repository exports key application colors as CSS custom properties in `src/styles/styles.theme.scss`. These runtime variables are the preferred first-choice when styling components because they can be changed at runtime (theme toggles, customer theming, A/B tests) without rebuilding.

Common app variables you can rely on:

- `--app-primary` — primary brand color — #03345d (`--app-primary-on`: #ffffff)
- `--app-accent` — accent / secondary color — #f07c34 (`--app-accent-on`: #ffffff)
- `--app-info` — informational color — #80c5fe (`--app-info-on`: #000000)
- `--app-success` — success color — #86ff80 (`--app-success-on`: #000000)
- `--app-warn` — warn / caution color — #e55b03 (`--app-warn-on`: #ffffff)

## Color swatches (quick reference)

| Variable | Hex | On-color | Example (CSS)
|---|---:|---:|---|
| `--app-primary` | `#03345d` | `#ffffff` | `background: #03345d; color: #ffffff;`
| `--app-accent`  | `#f07c34` | `#ffffff` | `background: #f07c34; color: #ffffff;`
| `--app-info`    | `#80c5fe` | `#000000` | `background: #80c5fe; color: #000000;`
| `--app-success` | `#86ff80` | `#000000` | `background: #86ff80; color: #000000;`
| `--app-warn`    | `#e55b03` | `#ffffff` | `background: #e55b03; color: #ffffff;`

Use the CSS example column when you need a quick copyable snippet for a component or storybook. This table renders in plain Markdown viewers that strip raw HTML.

Usage notes:

- These variables are emitted into the global `:root` by `styles.theme.scss`, so use `var(--app-primary)` directly in component SCSS/CSS.
- They are the recommended default for component-level styling because they enable runtime switching (dark mode, theming without rebuild).
- If you need per-page or scoped overrides, set the variable on a container (e.g. `html.theme-dark` or `.customer-foo`) so the components inherit the scoped value.

## How to consume tokens and CSS variables (short)

- SCSS tokens (compile-time): import with `@use './styles/styles.theme' as theme;` and reference SCSS variables or maps like `theme.$my-primary-palette` or `$app-primary`.
- CSS variables (runtime): reference `var(--app-primary)` in CSS/SCSS when you need runtime-swappable values.

### When to use which
- CSS variables: runtime toggles (dark mode, per-customer themes) and JS-driven updates.
- SCSS tokens: material theming helpers, computed swatches, or values that can be baked at build-time.

## Examples (first: runtime CSS variables)

Component SCSS using runtime CSS vars (recommended when you want runtime theming):

```scss
/* src/app/example/example.component.scss */
.card {
  background: var(--app-primary);
  color: var(--app-primary-on);
  border-radius: var(--button-border-radius, 6px);
}
```

Scoped override example (scoped overrides for a different theme):

```scss
/* in a global stylesheet or component that scopes a different theme */
html.theme-alt {
  --app-primary: #0b2540;
  --app-primary-on: #ffffff;
}
```

Component SCSS importing compile-time tokens (useful for theming helpers or compile-time computations):

```scss
@use '../../styles/styles.theme' as theme;

.brand-text {
  color: theme.$app-primary; // compile-time value baked into CSS
}
```

## Overriding Angular Material system variables

`custom-theme.scss` sets Material system variables with `@include mat.theme(...)` which emits `--mat-sys-*` variables. You can use those directly in component styles, but prefer mapping or referencing the `--app-*` variables for consistency.

Example using Material system vars:

```scss
.my-toolbar {
  background: var(--mat-sys-primary);
  color: var(--mat-sys-on-primary);
}
```

Example mapping app variables into Material theme (done in `custom-theme.scss` when composing the theme):

```scss
// custom-theme.scss composes a theme that uses the palette maps defined in styles.theme.scss
// This approach keeps Material's system variables aligned with the app CSS vars.
```

## Runtime theme toggle (pattern)

1. Compose a scoped theme in `custom-theme.scss` (any named scope):

```scss
.theme-alt { @include mat.theme($myThemeAlt); }
```

2. Toggle the class from JS/Angular:

```ts
// src/app/services/theme.service.ts
export class ThemeService {
  toggleThemeClass(className: string) { document.documentElement.classList.toggle(className); }
  setThemeClass(className: string, enabled: boolean) { document.documentElement.classList.toggle(className, enabled); }
}
```

This keeps the Material system variables scoped and avoids duplicate global includes.

## Verifying changes
- Run dev server: `ng serve` or `npm start`.
- Build: `ng build --configuration development`.
- In the browser: Network tab (verify fonts/assets), Elements tab (check the scoped theme class on `html` when toggled), Computed styles (confirm `var(--app-primary)` is used).

## Practical tips and gotchas
- Import order matters: ensure `styles.scss` imports palette-only files before the file that calls `@include mat.theme(...)` so SCSS symbols are available.
- Prefer CSS variables for values used widely — they avoid rebuilds when toggling themes.
- Keep `@include mat.theme(...)` to a single global or scoped file to avoid duplicated system variables.
- Add `contrast` entries to palette maps so Material picks readable foreground colors automatically.

## Next steps I can implement
- Expand the five brand hexes into full Material swatch maps (50..900 + A variants).
- Add a small Angular toggle component that persists theme choice to localStorage and toggles `.theme-dark`.

---
Tell me which next step you'd like and I'll implement it.
