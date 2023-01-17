import { TestBed } from '@angular/core/testing';

import { UtlisService } from './utlis.service';

describe('UtlisService', () => {
  let service: UtlisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtlisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
