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
	@include mat.theme((
	color: (
	primary: mat.$violet-palette,
	tertiary: mat.$orange-palette,
	theme-type: light,
	),
	typography: Roboto,
	density: 0,
	));
}

// Token override example (narrow, safe)
.brand-button {
	@include mat.theme-overrides((
	primary-container: #84ffff,
	));
}
```

Creating a custom palette (workflow)
- Option A (schematic):
	- `ng generate @angular/material:theme-color --name=myBrand --primary=#123456 --accent=#ffab00`
	- This creates a palette map you can `@use` and pass to `mat.theme`.
- Option B (manual):
	- Use the Material palette generator to produce color swatches and contrast tokens.
	- Build a Sass map with swatches and a `contrast` map and pass it as the `primary` or `color` map to `mat.theme`.

Where to put the theme file
- Add `src/styles.theme.scss` and import it from `src/styles.scss` (or replace `src/styles.css` with `scss` and include the theme there). Ensure `angular.json` lists the resulting CSS in the `styles` array.

Accessibility / checks
- Verify contrast using Material palette tool or automated checks. Ensure important text meets WCAG AA contrast.
- When switching to dark mode, test `color-scheme: light dark` behavior and verify tokens like `--mat-sys-on-primary-container` are readable.

Component-level overrides
- Prefer the component `overrides` API instead of targeting internals (see Material docs). Example: `@include mat.card-overrides((elevated-container-color: red));` inside your theme file.

Notes for this repo
- This repo currently uses global `src/styles.css`; convert to `scss` and add the theme file if you plan to use Angular Material tokens.
- Keep theme code in one file (`src/styles.theme.scss`) and keep `src/styles.scss` small — import tokens from the theme file.

References
- Angular Material theming guide: https://material.angular.dev/guide/theming
- Material color system: https://material.io/design/color/the-color-system.html

```

