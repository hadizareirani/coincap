import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { assetsInitialResolver } from './assets-initial.resolver';

describe('assetsInitialResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => assetsInitialResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
