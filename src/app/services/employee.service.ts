
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';


@Injectable()
export class EmployeeService {
  constructor(private http: Http) { }

  getAllEmployees() {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.get(`api/employees`, {headers: headers}).pipe(
    map(res => res.json()));
  }
  addEmployee(employee) {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.post(`api/employees`, employee, {headers: headers}).pipe(
      map(res => res.json()));
  }
}
