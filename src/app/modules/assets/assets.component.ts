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
import { UtilsService } from '../../shared/services/utils.service';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetsComponent implements OnInit {
  private assetsRepositoryService = inject(AssetsRepositoryService);
  utilsService = inject(UtilsService);

  dataList$!: Observable<IAssets[]>;

  ngOnInit(): void {
    this.initialData();
  }

  private initialData(params?: { [key: string]: string }) {
    this.dataList$ = this.assetsRepositoryService
      .getAllAssets(params)
      .pipe(map((m) => m.data));
  }
}
