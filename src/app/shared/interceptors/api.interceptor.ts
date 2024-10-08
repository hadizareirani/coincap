import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const request = req.clone({
    url: `${environment.apiURL}${req.url}`,
  });
  return next(request);
};
