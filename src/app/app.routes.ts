import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'rates', pathMatch: 'full' },
  {
    path: 'rates',
    loadComponent: () =>
      import('./modules/rates/rates.component').then((m) => m.RatesComponent),
  },
];
