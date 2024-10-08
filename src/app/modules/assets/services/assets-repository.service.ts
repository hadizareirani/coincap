import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAssets } from '../models/i-assets';
import { IResponseModel } from '../../../shared/models/i-response.model';
import { Observable } from 'rxjs';
import { IAssetHistory } from '../models/i-asset-history';

@Injectable({
  providedIn: 'root',
})
export class AssetsRepositoryService {
  private httpClient = inject(HttpClient);
  constructor() {}

  getAllAssets(params?: {
    [key: string]: string;
  }): Observable<IResponseModel<IAssets[]>> {
    return this.httpClient.get<IResponseModel<IAssets[]>>('assets', {
      params: params && new HttpParams().appendAll(params),
    });
  }

  getAssetHistory(
    id: string,
    params?: {
      [key: string]: string;
    }
  ) {
    return this.httpClient.get<IResponseModel<IAssetHistory[]>>(`assets/${id}/history`, {
      params: params && new HttpParams().appendAll(params),
    });
  }
}
