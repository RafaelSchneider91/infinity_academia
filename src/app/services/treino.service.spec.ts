import { TestBed } from '@angular/core/testing';

import { TreinoService } from './treino.service';

describe('TreinoService', () => {
  let service: TreinoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreinoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
