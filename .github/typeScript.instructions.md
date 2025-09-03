---
applyTo: '**'
---
Guidelines for avoiding deprecated APIs (TypeScript / Angular)

Purpose
- Ensure generated or modified code uses current Angular/RxJS APIs. Detect, replace, or flag deprecated patterns and include an authoritative reference in PRs when changes are made.

Quick pre-generation checklist
- Run `ng version` to determine Angular major version and consult the Angular deprecations guide and `update.angular.io` when unsure.
- Prefer standalone components and `bootstrapApplication` (this repo uses that pattern).
- Preserve SSR and zoneless change-detection wiring (`src/server.ts`, `src/main.server.ts`, `src/app/app.config.ts`).
- After edits run: `npm run format:check`, `ng build --configuration development`, and `npm run test`.

Common deprecated → replacement (concrete examples)
- `TestBed.get(...)` -> `TestBed.inject(...)` (tests)
- Class-based route guards in route definitions -> functional guards using `inject(...)` or router helpers (`mapToCanActivate`)
- `loadChildren` string syntax -> dynamic import: `() => import('./x').then(m => m.XModule)`
- Factory-based APIs (ComponentFactoryResolver, NgModuleFactory, createComponent(factory)) -> pass Component/NgModule class or use new `createComponent` signatures
- `entryComponents` / `ANALYZE_FOR_ENTRY_COMPONENTS` -> remove (Ivy)
- `TestBed.async` -> `waitForAsync`
- `ModuleWithProviders` without a generic -> add the module generic: `ModuleWithProviders<MyModule>`

Detection heuristics (repo search patterns)
- Search for these tokens and flag for review: `TestBed.get(`, `loadChildren:\s*['\"\`]`, `ComponentFactoryResolver`, `entryComponents`, `ANALYZE_FOR_ENTRY_COMPONENTS`, `BrowserModule.withServerTransition`, `ModuleWithProviders<`, `@Component.moduleId`, `PlatformRef.bootstrapModuleFactory`.
- If a trivial string/identifier replacement exists (e.g., TestBed.get -> TestBed.inject), apply it automatically. For structural changes (guards, factories) open a migration PR and add a comment linking Angular docs.

Automation & verification
- Use `ng update` (and `update.angular.io`) for version upgrades and automated migrations.
- After any change run these checks:
  - `npm run format:check` (prettier)
  - `ng build --configuration development` (type + template checks)
  - `npm run test` (Karma unit tests)
- Add a small unit test when refactoring deprecated behavior to demonstrate parity.

Repository-specific notes
- The project uses:
  - Standalone components (see `src/app/app.ts`)
  - Zoneless change detection (`provideZonelessChangeDetection()` in `src/app/app.config.ts`)
  - Client hydration (`provideClientHydration(withEventReplay())`)
  - SSR via `@angular/ssr` and `src/server.ts` (Express + AngularNodeAppEngine)
- Avoid editing `src/server.ts` unless adding non-Angular REST endpoints; prefer editing `src/app/app.routes.server.ts` for SSR routing.

Authoritative references
- Angular deprecations guide: https://angular.dev/guide/deprecations
- Angular update guide: https://update.angular.io/
- RxJS migration notes: https://rxjs.dev/guide/migration

If you want, run a repo-wide scan now to list candidate deprecated usages and propose automatic fixes for trivial replacements.

Auto-scan summary (performed automatically)
- Scanned tokens: `TestBed.get(`, `loadChildren:` string syntax, `ComponentFactoryResolver`, `entryComponents`, `ANALYZE_FOR_ENTRY_COMPONENTS`, `BrowserModule.withServerTransition`, `ModuleWithProviders` without generic, `@Component.moduleId`, `PlatformRef.bootstrapModuleFactory`.
- Result: No occurrences found in repository source files requiring an automatic one-to-one replacement.
- Action: No code changes applied. If you want, I can run `ng version` and re-run this scan as part of a CI check and/or open a PR with suggested fixes if any new deprecated usages appear.

Note: prefer Angular control-flow blocks (`@if` / `@for`)

- Rationale: This repository prefers using Angular's newer control-flow blocks (`@if` and `@for`) in templates where preserving DOM shape for SSR/hydration and clearer intent helps reduce hydration mismatches and improve readability. These blocks provide an explicit, compact syntax for conditional and iterative rendering and are the recommended pattern when available for your Angular toolchain.

- Examples:
  - Conditional rendering:

    @if (currentActivity) {
      <div class="swipe-card"> ... </div>
    }

  - Iteration with tracking:

    @for (tag of currentActivity.tags; track tag) {
      <span class="tag">{{ tag }}</span>
    }

- Compatibility & fallbacks:
  - The `@if` / `@for` syntax requires a compatible Angular template parser/language-service. If your local environment or CI reports parse errors for control-flow blocks, either:
    1) Ensure your Angular packages and `@angular/language-service` are on a version that supports control-flow blocks (Angular 20.x+ or the experimental `next` channel as appropriate). Use `npx ng version` and `npm install` to align versions.
    2) If upgrading is not possible, fall back to canonical structural directives and explicit `trackBy` functions:
       - Use `*ngIf="exp"` or `[hidden]` depending on hydration requirements.
       - Use `*ngFor="let item of items; trackBy: trackByFn"` for lists and implement a `trackBy` method in the component.

- References:
  - Angular control-flow docs: https://angular.dev/guide/control-flow-structures
  - Experimental control-flow guidance: https://angular.dev/guide/experimental/control-flow

Use `@if`/`@for` where your toolchain supports them; otherwise prefer `*ngFor` with `trackBy` and consider `[hidden]` when you need stable DOM shape for SSR/hydration.