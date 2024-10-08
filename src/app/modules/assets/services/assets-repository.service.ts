import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssetsRepositoryService {
  private httpClient = inject(HttpClient);
  constructor() {}

  getAllAssets(params?: { [key: string]: string }) {
    return this.httpClient.get('assets', {
      params: params && new HttpParams().appendAll(params),
    });
  }
}
