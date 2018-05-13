import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/Employee';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { EmployeeService } from '../../../services/employee.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: Http,
    private employeeService: EmployeeService,
    private flashMessage: FlashMessagesService
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
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.message, {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/employees']);
        } else {
          console.log(data.error);
          this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/employees']);
        }
      });
    }
  }

}
