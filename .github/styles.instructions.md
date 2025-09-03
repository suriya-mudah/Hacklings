```instructions
---
applyTo: '**'
---

Angular Material — Custom palette & theming guide (concise)

Purpose
- Give AI agents the minimal, actionable steps and examples required to add or modify Angular Material themes and custom color palettes in this repo.

High-level steps
- Install Material (if not already): `ng add @angular/material` — this wires schematics, CDK, and basic theme helpers.
- Create a theme file (recommended: `src/styles.theme.scss`) and import it from `src/styles.scss` / `src/styles.css` by converting to SCSS.
- Prefer using the Material theming schematic for palettes: `ng generate @angular/material:theme-color` or use the Material palette generator (https://material.io/tools/color/). The schematic will produce a color map you can further tweak.

SCSS example (safe, minimal)
```scss
@use '@angular/material' as mat;

html {
	color-scheme: light dark;
}
  /* Use Verdana as the main font for this project. Verdana files are included in
     `src/assets/fonts/verdana-font-family/` (verdana.ttf, verdana-bold.ttf, verdana-bold-italic.ttf).
     Load them in `src/fonts.scss` (or import here) via @font-face, then set typography to Verdana.
---
applyTo: '**'
---

# Angular Material — repo-specific theming quick guide

Purpose
- Short, actionable steps to add or modify Angular Material theming in this repo.

Key repo files (this project)
- Global entry: `src/styles.scss` — imports theme and fonts.
- Theme tokens: `src/styles/styles.theme.scss` — defines app color tokens and CSS vars.
- Theme application: `src/styles/custom-theme.scss` — composes the Material theme with `@include mat.theme(...)`.
- Make sure `angular.json` includes `src/styles/custom-theme.scss` then `src/styles.scss` in the `build.options.styles` array.

Quick setup
- If Material isn't installed: run `ng add @angular/material` to install helpers and schematics.
- Define your palettes in `src/styles/styles.theme.scss` (this repo already defines the five app colors as SCSS tokens and CSS variables).
- Compose and apply the theme in `src/styles/custom-theme.scss` using `@use '@angular/material' as mat;` and `@include mat.theme($myTheme);`.

Recommended conventions for this repo
- Load fonts first: import `src/styles/fonts.scss` from `src/styles.scss` before applying theme tokens so typography uses Verdana.
- Export colors as both SCSS variables and CSS custom properties (example in `styles.theme.scss`):
	- SCSS: `$app-primary: #03345d;`
	- CSS var: `--app-primary: #03345d;`
- Use the CSS vars at runtime in components: `background: var(--app-primary);`.

Using Material palettes
- For production-ready Material theming, generate full swatches (50..900, A100..) with the Material palette tool or `ng generate @angular/material:theme-color`.
- This repo includes minimal palette maps (`$my-primary-palette`, `$my-accent-palette`, etc.). Use them as seeds or replace with full palettes.

Practical gotchas
- Import order matters: `styles.theme.scss` must be available to `custom-theme.scss` when the mixin runs; `src/styles.scss` should `@use` the theme then the custom-theme, and `angular.json` must reference `src/styles/custom-theme.scss` first.
- When switching to dark mode, verify `color-scheme` and on-surface/on-primary tokens for contrast.

Example small checklist for adding a new brand color
1. Add SCSS variable & CSS var in `src/styles/styles.theme.scss`.
2. Add a minimal palette map (500 + contrast) in the same file.
3. Use the palette in `src/styles/custom-theme.scss` and run a dev build to verify.

Further reading
- Angular Material theming guide: https://material.angular.dev/guide/theming
- Material color system: https://material.io/design/color/the-color-system.html
- Build a Sass map with swatches and a `contrast` map and pass it as the `primary` or `color` map to `mat.theme`.
	- Material color system: https://material.io/design/color/the-color-system.html

	- Build a Sass map with swatches and a `contrast` map and pass it as the `primary` or `color` map to `mat.theme`.
