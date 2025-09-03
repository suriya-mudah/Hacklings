# Hacklings

An Angular 20 standalone application scaffold with server-side rendering (SSR) support.

This README shows the common local developer commands and a brief note about branching conventions used in this repository.

Prerequisites
- Node 20.x (recommended)
- npm 11.x or compatible

Quick setup

```bash
npm install
```

Local development (browser)

```bash
# dev server with HMR
npm start
# or
ng serve
```

Build (browser + server)

```bash
# Build the client and server bundles
npm run build
```

Serve the SSR build locally

```bash
# after a successful build
npm run serve:ssr:hacklings
```

Tests and formatting

```bash
# unit tests (Karma)
npm test

# format check / format (project uses Prettier)
npm run format:check
npm run format
```

Notes about branches
- `main` — the production branch. Releases and CI deploys are created from `main`.
- `dev` — the development integration branch. Open feature or fix pull requests against `dev` and merge `dev` into `main` when ready for release.

Branching
- This repo uses two dedicated developer branches (for the two active developers) in addition to `dev` and `main`.
- Workflow: each developer commits to their assigned developer branch (for example `suriya-branch` and `yaroslav-branch`), then open PRs targeting `dev` for integration and CI validation.
- After PR review and CI green on `dev`, merge `dev` into `main` for releases. Use short-lived feature branches off your developer branch when working on specific tasks.

More resources
- Angular CLI docs: https://angular.dev/guide/cli

If you want, I can add a short CONTRIBUTING.md with these branch rules and a sample PR checklist.

## Project summary

Hacklings is an Angular 20 standalone application scaffold with server-side rendering (SSR) enabled. It contains basic theming, local Verdana fonts, and a few small UI components (nav, card, etc.). The project is a work in progress — there are three pages planned but only the Home page is wired and visible by default.

### Current status
- Framework: Angular 20 (CLI + SSR)
- Pages/components:
	- Home — implemented and currently shown by the app
	- Profile — component and template exist (uses typed mock data and an SVG avatar) and is reachable via the nav avatar (routes to `/profile`).
	- Login — present as a component/file but not yet linked from the UI; you must type `/login` to reach it or wire a nav link.
- Theming & fonts: Verdana is included via `src/styles/fonts.scss` and global theme tokens are exported as CSS vars (for example `--app-primary`, `--app-info`).
- Template style: this repo uses the experimental `@if` / `@for` control-flow syntax in some templates (project builds with current toolchain). Consider converting to canonical `*ngIf` / `*ngFor` if you need broader tooling compatibility.

### How to run (quick)
1. Install deps: `npm install`
2. Dev server: `npm start` or `ng serve`
3. Build: `npm run build`
4. Serve SSR build: `npm run serve:ssr:hacklings` (after a successful build)

### Conventions & notes for contributors
- Styles: global styles and theme are in `src/styles/` — `fonts.scss`, `custom-theme.scss`, `styles.scss` are loaded from `angular.json`.
- Fonts: font files live under `src/assets/fonts/verdana-font-family/` and are referenced from `fonts.scss`.
- Routing: currently not all pages are routed; add routes in `src/app/app.routes.ts` and update `NavComponent` to expose links.
- Experimental syntax: if you prefer standard templates, replace `@if`/`@for` with `*ngIf`/`*ngFor` + `trackBy`.
