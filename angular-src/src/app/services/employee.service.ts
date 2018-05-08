import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class EmployeeService {
  constructor(private http: Http) { }

  getAllEmployees() {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.get('api/employees', {headers: headers})
    .map(res => res.json());
  }
}
