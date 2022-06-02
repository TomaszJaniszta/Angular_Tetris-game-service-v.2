import { TestBed } from '@angular/core/testing';

import { LockedGuard } from './LockedGuard.guard';

describe('LockedGuard', () => {
  let guard: LockedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LockedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
