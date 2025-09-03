import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Client },
  { path: 'login', renderMode: RenderMode.Client },
  // keep wildcard prerender as a fallback for static pages
  { path: '**', renderMode: RenderMode.Prerender }
];
