import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/Employee';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: Http
  ) {}

  private employee: Employee;
  employeeForm: FormGroup;
  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['']
    });
  }

  onFormSubmit() {

    // validate required fields
    if (this.employeeForm.valid) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.employee = this.employeeForm.value;
      return this.http.post('http://localhost:3000/employees', this.employee, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        if (data.success) {
          this.router.navigate(['/employees']);
        } else {
          this.router.navigate(['/employees']);
        }
      });
    }
  }

}
