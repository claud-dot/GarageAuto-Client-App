import { TestBed } from '@angular/core/testing';

import { OtherGuard } from './other.guard';

describe('OtherGuard', () => {
  let guard: OtherGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OtherGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
