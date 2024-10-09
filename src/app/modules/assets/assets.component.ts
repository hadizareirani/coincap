import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AssetsRepositoryService } from './services/assets-repository.service';
import { IAssets } from './models/i-assets';
import { map, Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetsComponent implements OnInit {
  private assetsRepositoryService = inject(AssetsRepositoryService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  dataList$!: Observable<IAssets[]>;
  displayedColumns: string[] = ['rank', 'name', 'symbol', 'priceUsd'];

  ngOnInit(): void {
    this.dataList$ = this.activatedRoute.data.pipe(
      map((m) => {
        return m['initialData'];
      })
    );
  }

  private initialData(params?: { [key: string]: string }) {
    this.dataList$ = this.assetsRepositoryService
      .getAllAssets(params)
      .pipe(map((m) => m.data));
  }

  searchHandler(event: Event) {
    const search = (event.target as HTMLInputElement).value;
    const queryParams: Params = { search };
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );
    this.initialData({ search });
  }

  goToAsset(row: IAssets) {
    this.router.navigate([row.id],{relativeTo:this.activatedRoute}).then();
  }
}
