import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {
  constructor(private http: Http) { }

  getAllEmployees() {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${environment.url}/api/employees`, {headers: headers})
    .map(res => res.json());
  }
  addEmployee(employee) {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${environment.url}/api/employees`, employee, {headers: headers})
      .map(res => res.json());
  }
}
