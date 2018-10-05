import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class ProjectService {
  constructor(private http: Http) {}

  getAllProjects(company_id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`api/companies/${company_id}/projects`, {headers: headers})
    .map(res => res.json());
  }

  getProject(company_id, project_id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`api/companies/${company_id}/projects/${project_id}`, {headers: headers})
    .map(res => res.json());
  }

  addProject(company_id, project) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`api/companies/${company_id}/projects`, project, {headers: headers})
    .map(res => res.json());
  }

  updateProject(company_id, project_id, updatedProject) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(`api/companies/${company_id}/projects/${project_id}`, updatedProject, {headers: headers})
    .map(res => res.json());
  }

  addIncome(company_id, project_id, income) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`api/companies/${company_id}/projects/${project_id}/add-income`, income, {headers: headers})
    .map(res => res.json());
  }
  addExpense(company_id, project_id, expense) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`api/companies/${company_id}/projects/${project_id}/add-expense`, expense, {headers: headers})
    .map(res => res.json());
  }
}
