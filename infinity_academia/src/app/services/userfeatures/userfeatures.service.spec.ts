import { TestBed } from '@angular/core/testing';

import { UserfeaturesService } from './userfeatures.service';

describe('UserfeaturesService', () => {
  let service: UserfeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserfeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
