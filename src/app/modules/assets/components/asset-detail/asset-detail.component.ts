import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AssetsRepositoryService } from '../../services/assets-repository.service';
import { map, Observable } from 'rxjs';
import { IAssetHistory } from '../../models/i-asset-history';
import { AsyncPipe, JsonPipe } from '@angular/common';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-asset-detail',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, HighchartsChartModule],
  templateUrl: './asset-detail.component.html',
  styleUrl: './asset-detail.component.scss',
})
export class AssetDetailComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private assetsRepositoryService = inject(AssetsRepositoryService);

  dataList$!: Observable<IAssetHistory[]>;
  intervalParam = { interval: 'd1' };

  highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series:[{
      data: [1],
      type: 'area',
    }]
  };
  updateFlag = false;
  constructor() {}
  ngOnInit(): void {
    // this.dataList$ = this.initialData();
    this.initialData();
  }
  initialData() {
    this.assetsRepositoryService
      .getAssetHistory(
        this.activatedRoute.snapshot.params['id'],
        Object.keys(this.activatedRoute.snapshot.queryParams).length === 0
          ? { interval: 'd1' }
          : this.activatedRoute.snapshot.queryParams
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        console.log('====================================');
        console.log(res.data.map((m) => [m.time, Number(m.priceUsd)]),);
        console.log('====================================');
        // this.chartOptions.series?.push({
        //   data:
        //   type: 'area',
        // });
        this.updateFlag = true;
      });
  }
}
