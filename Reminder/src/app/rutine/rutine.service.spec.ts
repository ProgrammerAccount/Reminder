import { TestBed } from '@angular/core/testing';

import { RutineService } from './rutine.service';

describe('RutineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RutineService = TestBed.get(RutineService);
    expect(service).toBeTruthy();
  });
});
