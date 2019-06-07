import { TestBed } from '@angular/core/testing';

import { NavsvcService } from './navsvc.service';

describe('NavsvcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavsvcService = TestBed.get(NavsvcService);
    expect(service).toBeTruthy();
  });
});
