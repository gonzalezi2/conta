import { Injectable } from '@angular/core';

@Injectable()
export class ValidateCompanyService {

  constructor() { }

  validateCompany(company) {
    if (company.name === undefined) {
      return false;
    } else {
      return true;
    }
  }
}
