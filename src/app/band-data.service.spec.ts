import { TestBed } from '@angular/core/testing';

import { BandDataService } from './band-data.service';

describe('BandDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BandDataService = TestBed.get(BandDataService);
    expect(service).toBeTruthy();
  });
});
