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

Branching recommendations
- Create short-lived feature branches from `dev` (for example: `feat/my-feature`).
- Open a PR targeting `dev` and request reviews. Once approved and validated by CI, merge into `dev`.
- Periodically a release PR or merge from `dev` -> `main` creates the production snapshot.

More resources
- Angular CLI docs: https://angular.dev/guide/cli

If you want, I can add a short CONTRIBUTING.md with these branch rules and a sample PR checklist.
