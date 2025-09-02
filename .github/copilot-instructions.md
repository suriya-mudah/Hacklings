## Quick orientation for AI coding agents

This repo is an Angular 20 application scaffolded with SSR support. The goal of these instructions is to help an agent be productive quickly by highlighting the app structure, developer workflows, conventions, and concrete commands.

### Big picture
- Type: Angular 20 standalone-app + SSR (server-side rendering) using `@angular/ssr`.
- Entry points:
  - Browser bootstrap: `src/main.ts` (calls `bootstrapApplication(App, appConfig)`).
  - Server bootstrap: `src/main.server.ts` and `src/server.ts` (Express + `AngularNodeAppEngine`).
- Static assets served from the `public/` folder (configured in `angular.json` -> `assets`).
- Output: `dist/hacklings` (server entrypoint: `dist/hacklings/server/server.mjs`).

### Key files to read before editing
- `angular.json` — build/serve/test configuration and SSR options.
- `package.json` — scripts (notably `start`, `build`, `test`, `serve:ssr:hacklings`, and prettier scripts).
- `src/main.ts`, `src/main.server.ts`, `src/server.ts` — bootstrapping paths (browser vs server).
- `src/app/app.config.ts` and `src/app/app.config.server.ts` — application provider wiring (zoneless CD, hydration, server routes).
- `src/app/app.routes.server.ts` — server rendering route rules.
- `src/app/*` — component and app templates (this project uses standalone component patterns).
- `.prettier` / `.prettierignore` — formatting rules.
- `.vscode/tasks.json` and `.vscode/launch.json` — IDE run/debug tasks.

### Project-specific patterns & conventions
- Standalone component pattern / bootstrapApplication: components are imported directly (see `src/main.ts` and `src/app/app.spec.ts` which imports `App`). Prefer creating standalone components when generating UI pieces.
- Zoneless change detection: project includes `provideZonelessChangeDetection()` in `app.config.ts` — expect tests and components to follow zoneless patterns.
- Client hydration: `provideClientHydration(withEventReplay())` is enabled; be cautious when changing event handling/state bootstrapping.
- SSR handling: Express server (`src/server.ts`) uses `AngularNodeAppEngine` and `createNodeRequestHandler`. Modify server routes in `app.routes.server.ts` rather than editing `server.ts` unless adding non-Angular REST endpoints.
- Assets: public files placed in `public/` are served statically; `angular.json` maps this folder into the build.

### Developer workflows & concrete commands
- Install dependencies:
  - `npm install`
- Dev server (browser HMR):
  - `ng serve` (or `npm start`)
- Build (production default):
  - `ng build` (output to `dist/hacklings`)
  - For development build with source maps: `ng build --configuration development`
- Run SSR server after build:
  - `npm run build` then `npm run serve:ssr:hacklings` (this runs `node dist/hacklings/server/server.mjs`)
- Tests & debug:
  - Unit tests: `ng test` (Karma). VSCode launch config `ng test` exists for browser debugging.
  - E2E: `ng e2e` if configured.
- Formatting:
  - `npm run format` — apply Prettier (project uses `.prettier` config and `.prettierignore`).
  - `npm run format:check` — verify formatting.

### Common generator commands (examples tailored to this repo)
- Standalone component (recommended):
  - `ng g c components/header --standalone --style=css`
- Service:
  - `ng g s services/api`
- Module with lazy route:
  - `ng g m features/admin --route admin --module src/app/app.config.ts`
Note: prefer `--standalone` components to match existing bootstrap pattern.

### Integration & external dependencies
- Server: `express` + `@angular/ssr` (see `src/server.ts`). When adding server endpoints, expose them in `src/server.ts` but keep Angular rendering as the fallback.
- Node/npm: project was tested with Node 20.x and npm 11.x (see repo CLI output). Use those or compatible versions.

### Editing rules an agent should follow
- Preserve SSR wiring: avoid breaking `src/server.ts`, `src/main.server.ts`, `app.config.server.ts`, and `app.routes.server.ts` unless adding equivalent SSR-aware logic.
- Follow formatting: run `npm run format` before creating commits.
- Tests: run `ng test` after modifying app bootstrapping or change detection to catch zoneless-related issues.
- When adding UI components, update imports where needed and prefer standalone components so they can be used in `bootstrapApplication` contexts.

### Where to look for examples
- Root app sample: `src/app/app.ts`, `src/app/app.html`, `src/app/app.spec.ts` — shows standalone component, template, and test pattern.
- SSR server: `src/server.ts` and `src/main.server.ts` — how server rendering and static serving are wired.

If anything above is unclear or you want the instructions to emphasize other workflows (CI, deployment, or adding a specific library), tell me what to include and I will iterate.
