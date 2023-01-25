import { TestBed } from '@angular/core/testing';

import { ReceiveCarService } from './receive-car.service';

describe('ReceiveCarService', () => {
  let service: ReceiveCarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiveCarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
