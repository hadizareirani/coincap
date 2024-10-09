import { Routes } from '@angular/router';
import { assetsInitialResolver } from './resolver/assets-initial.resolver';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./assets.component').then((m) => m.AssetsComponent),
    resolve: {
      initialData: assetsInitialResolver,
    },
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/asset-detail/asset-detail.component').then(
        (m) => m.AssetDetailComponent
      ),
  },
] satisfies Routes;
