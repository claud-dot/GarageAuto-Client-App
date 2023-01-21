import { TestBed } from '@angular/core/testing';

import { ClildGuard } from './clild.guard';

describe('ClildGuard', () => {
  let guard: ClildGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClildGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
