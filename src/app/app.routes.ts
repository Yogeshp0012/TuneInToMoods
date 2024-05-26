import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((x) => x.HomeComponent),
  },
  {
    path: 'preferences',
    loadComponent: () =>
      import('./preferences/preferences.component').then((x) => x.PreferencesComponent),
  },
  {
    path: 'mood-analyze',
    loadComponent: () =>
      import('./mood-analysis/mood-analysis.component').then((x) => x.MoodAnalysisComponent),
  },
  {
    path: 'mood-graph',
    loadComponent: () =>
      import('./mood-graph/mood-graph.component').then((x) => x.MoodGraphComponent),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
