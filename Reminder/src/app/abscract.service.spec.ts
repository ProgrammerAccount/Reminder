import { TestBed } from '@angular/core/testing';

import { AbscractService } from './abscract.service';

describe('AbscractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbscractService = TestBed.get(AbscractService);
    expect(service).toBeTruthy();
  });
});
