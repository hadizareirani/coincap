import { Route, Routes } from '@angular/router';
import { AssetsComponent } from './assets.component';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./assets.component').then((m) => m.AssetsComponent),
  },
] satisfies Routes;
