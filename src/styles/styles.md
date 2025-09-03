# Styles and Custom Styling (Hacklings)

## Purpose
Clear, concise reference for where theme tokens live and how to apply custom styling in components and when overriding Angular Material.

## Files of interest
- `src/styles/styles.theme.scss` — seed colors, SCSS tokens and exported CSS variables (runtime seeds).
- `src/styles/custom-theme.scss` — composes the Material theme via `@include mat.theme(...)` (light and optional dark variants).
- `src/styles.scss` — global entry point; imports theme files and `fonts.scss` and is included in builds.

## Quick workflow
1. Edit seed colors in `src/styles/styles.theme.scss`.
2. Compose themes in `src/styles/custom-theme.scss` (light + scoped dark).
3. Use runtime CSS variables (e.g. `var(--app-primary)`) in component styles for dynamic theming.

## How to consume tokens and CSS variables

- SCSS tokens (compile-time): import with `@use './styles/styles.theme' as theme;` and reference SCSS variables or maps like `theme.$my-primary-palette` or `$app-primary`.
- CSS variables (runtime): `styles.theme.scss` writes `:root { --app-primary: ... }`. Reference `var(--app-primary)` in CSS/SCSS when you need runtime-swappable values.

### When to use which
- CSS variables: runtime toggles (dark mode, per-customer themes) and JS-driven updates.
- SCSS tokens: material theming helpers, computed swatches, or values that can be baked at build-time.

## Examples

Component SCSS using runtime CSS vars

```scss
/* src/app/example/example.component.scss */
.card {
  background: var(--app-primary);
  color: var(--app-accent);
}
```

Component SCSS importing compile-time tokens

```scss
@use '../../styles/styles.theme' as theme;

.brand-text {
  color: theme.$app-primary; // compile-time value
}
```

## Overriding Angular Material system variables

`custom-theme.scss` sets Material system variables with `@include mat.theme(...)` (e.g. `--mat-sys-primary`). Use those in component styles:

```scss
.my-toolbar {
  background: var(--mat-sys-primary);
  color: var(--mat-sys-on-primary);
}
```

You can also map app CSS variables into `custom-theme.scss` or use `var(--app-primary)` directly for consistency.

## Runtime theme toggle (pattern)

1. Compose a scoped dark theme in `custom-theme.scss`:

```scss
.theme-dark { @include mat.theme($myThemeDark); }
```

2. Toggle the class from JS/Angular:

```ts
// src/app/services/theme.service.ts
export class ThemeService {
  toggleDark() { document.documentElement.classList.toggle('theme-dark'); }
  setDark(enabled: boolean) { document.documentElement.classList.toggle('theme-dark', enabled); }
}
```

This keeps the Material system variables scoped and avoids duplicate global includes.

## Verifying changes
- Run dev server: `ng serve` or `npm start`.
- Build: `ng build --configuration development`.
- In the browser: Network tab (verify fonts/assets), Elements tab (check `.theme-dark` on `html` when toggled), Computed styles (confirm `var(--app-primary)` is used).

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
