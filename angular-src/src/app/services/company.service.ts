import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {
  constructor(private http: Http) { }

  getAllCompanies() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${environment.url}/api/companies`, {headers: headers})
    .map(res => res.json());
  }

  getCompanyById(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${environment.url}/api/companies/${id}`, {headers: headers})
    .map(res => res.json());
  }

  addCompany(company) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${environment.url}/api/companies`, company, {headers: headers})
    .map(res => res.json());
  }

}
