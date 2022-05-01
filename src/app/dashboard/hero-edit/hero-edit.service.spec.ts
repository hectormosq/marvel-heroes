import { TestBed } from '@angular/core/testing';

import { HeroEditService } from './hero-edit.service';

describe('HeroEditService', () => {
  let service: HeroEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
