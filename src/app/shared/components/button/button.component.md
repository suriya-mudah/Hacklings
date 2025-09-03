## app-button — styling variables

This document explains the CSS custom properties the `app-button` component supports and shows short examples for overriding them locally (for example from `src/app/<page>/<page>.scss`).

### Supported CSS variables
- `--button-bg` — primary background color for the button (used by `variant="primary"`).
- `--button-color` — primary text/foreground color for the button.
- `--button-font-size` — sets the button font-size (eg. `1rem`, `14px`).
- `--button-secondary-bg` — background color used when `variant="secondary"`.
- `--button-secondary-color` — text color for the secondary variant.
- `--button-ghost-color` — text color for the ghost variant.
- `--button-ghost-outline` — outline/border color for the ghost variant.
 - `--button-border-radius` — control the corner radius for the button (uses shared default if not set).

These variables are optional. The component resolves colors in this order of precedence (now preferring your app tokens first):
1. Per-instance/page CSS variable (the ones listed above).
2. Repository-level app tokens (`--app-*`) when present.
3. Angular Material system token (`--mat-sys-*`) when available.
4. Hard-coded sensible fallback colors.

### How to override (page-local example)
Put overrides in the page/component stylesheet where you want the styles to apply. Example (copy into `src/app/login/login.scss`):

```scss
.btn-container app-button {
	--button-bg: #0057b8;      /* primary background for login page */
	--button-color: #ffffff;   /* primary text color */
	--button-font-size: 1.05rem;
	--button-border-radius: 8px; /* prefer setting the token so the shared stylesheet uses it */
}

/* Variant-specific override */
.btn-container app-button[variant="ghost"] {
	--button-ghost-color: #0057b8;
	--button-ghost-outline: rgba(0,87,184,0.18);
}
```

Targeting the component like this is scoped and will not affect other pages.

### Template usage examples
- Basic: `<app-button label="Sign in"></app-button>`
- With projection: `<app-button><strong>Sign in</strong></app-button>`
- Variant: `<app-button label="Cancel" variant="ghost"></app-button>`
- Full width: `<app-button label="Next" fullWidth="true"></app-button>`

### Accessibility notes
- The component uses a non-structural hidden pattern for the optional `label` (keeps DOM stable for SSR/hydration). If you need the element removed entirely, use your own `*ngIf` wrapper where necessary.
- Remember to add `aria-*` attributes on usage when the button's meaning requires extra context (for example `aria-label` for icon-only buttons).

### Quick verification
1. Edit your page stylesheet and add variable overrides as above.
2. Reload the page in the browser and inspect the button element in DevTools — check computed styles for the resolved `background-color` and `font-size`.

If you want, I can add a short example to `src/app/shared/README.md` or include a unit test that asserts CSS variables are present in the component's rendered output.