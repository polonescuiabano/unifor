import { TestBed } from '@angular/core/testing';

import { CurriculumMatrixService } from './curriculum-matrix.service';

describe('CurriculumMatrixService', () => {
  let service: CurriculumMatrixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurriculumMatrixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
