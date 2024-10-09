import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AssetsRepositoryService } from '../../services/assets-repository.service';
import { map, Observable } from 'rxjs';
import { IAssetHistory } from '../../models/i-asset-history';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-asset-detail',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './asset-detail.component.html',
  styleUrl: './asset-detail.component.scss',
})
export class AssetDetailComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private assetsRepositoryService = inject(AssetsRepositoryService);

  dataList$!: Observable<IAssetHistory[]>;
  intervalParam = { interval: 'd1' };
  ngOnInit(): void {
    this.dataList$ = this.initialData();
  }
  initialData() {
    return this.assetsRepositoryService
      .getAssetHistory(
        this.activatedRoute.snapshot.params['id'],
        Object.keys(this.activatedRoute.snapshot.queryParams).length === 0
          ? { interval: 'd1' }
          : this.activatedRoute.snapshot.queryParams
      )
      .pipe(map((m) => m.data));
  }
}
