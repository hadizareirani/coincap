import { Component, inject } from '@angular/core';
import { AssetsRepositoryService } from './services/assets-repository.service';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss',
})
export class AssetsComponent {
  assetsRepositoryService = inject(AssetsRepositoryService);
}
