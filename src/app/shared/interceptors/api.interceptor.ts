import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { inject } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { tap } from 'rxjs';
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const utilsService = inject(UtilsService);
  utilsService.isLoading.set(true);
  const request = req.clone({
    url: `${environment.apiURL}${req.url}`,
  });
  return next(request).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        utilsService.isLoading.set(false);
      }
    })
  );
};
