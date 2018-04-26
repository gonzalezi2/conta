import { TestBed, inject } from '@angular/core/testing';

import { ValidateCompanyService } from './validate-company.service';

describe('ValidateCompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidateCompanyService]
    });
  });

  it('should be created', inject([ValidateCompanyService], (service: ValidateCompanyService) => {
    expect(service).toBeTruthy();
  }));
});
