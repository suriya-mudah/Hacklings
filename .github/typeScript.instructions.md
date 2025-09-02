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

Note: `*ngIf` deprecation guidance
- This repository treats `*ngIf` as deprecated in favor of non-structural alternatives in surfaced templates (for example using `[hidden]`, CSS utilities, or component-level logic) to preserve template shape for SSR/hydration and to avoid DOM reflow where possible.
- Example replacement:
  - Deprecated: `<span *ngIf="label">{{ label }}</span>`
  - Preferred: `<span [hidden]="!label" aria-hidden="{{ !label }}">{{ label }}</span>`
- Reason: Using `[hidden]` keeps the element in the DOM for hydration/SSR and maintains stable DOM structure; use structural directives when elements must be removed entirely for logic or performance reasons.