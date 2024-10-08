import { TestBed } from '@angular/core/testing';

import { AssetsRepositoryService } from './assets-repository.service';

describe('AssetsRepositoryService', () => {
  let service: AssetsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
