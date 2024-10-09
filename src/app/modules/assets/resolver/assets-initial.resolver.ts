import { ResolveFn } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IAssets } from '../models/i-assets';
import { inject } from '@angular/core';
import { AssetsRepositoryService } from '../services/assets-repository.service';

export const assetsInitialResolver: ResolveFn<Observable<IAssets[]>> = (route, state) => {
  const assetsRepositoryService = inject(AssetsRepositoryService);
  return assetsRepositoryService
  .getAllAssets(route.queryParams)
  .pipe(map((m) => m.data));
};
