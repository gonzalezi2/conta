import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Timesheet } from '../../../models/Timesheet';
import { Employee } from '../../../models/Employee';
import { EmployeeService } from '../../../services/employee.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-add-time',
  templateUrl: './add-time.component.html',
  styleUrls: ['./add-time.component.css']
})
export class AddTimeComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: Http,
    private flashMessage: FlashMessagesService,
    private employeeService: EmployeeService,
    private projectService: ProjectService
  ) {}
  employees: Employee;
  timesheet: Timesheet;
  timeForm: FormGroup;
  hours: any[] = [];

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe(
      data => {
        this.employees = data.employees;
      },
      err => {
        console.log(err);
        return false;
      }
    );
    this.timeForm = this.fb.group({
      date: ['', Validators.required],
      hours: this.fb.array([this.createRow()]),
      tot_hrs: 0,
      tot_ot: 0,
      tot_cost: 0
    });
  }
  createRow(): FormGroup {
    return this.fb.group({
        employee: [Employee, Validators.required],
        wed: 0,
        wed_ot: 0,
        thurs: 0,
        thurs_ot: 0,
        fri: 0,
        fri_ot: 0,
        sat: 0,
        sat_ot: 0,
        sun: 0,
        sun_ot: 0,
        mon: 0,
        mon_ot: 0,
        tues: 0,
        tues_ot: 0,
        rate: [0, Validators.required],
        rate_ot: [0, Validators.required],
        reg_hrs: 0,
        ot_hrs: 0,
        tot_cost: 0
    });
  }
  addHours(index, type: String) {
    let formObjectValues, filteredValues = [];
    formObjectValues = <FormArray>this.timeForm.controls['hours'].value[index];
    if (type === 'reg') {
      filteredValues = this.filterObjectToArray(formObjectValues, ['wed', 'thurs', 'fri', 'sat', 'sun', 'mon', 'tues']);
    } else if (type === 'ot') {
      filteredValues = this.filterObjectToArray(
        formObjectValues,
        ['wed_ot', 'thurs_ot', 'fri_ot', 'sat_ot', 'sun_ot', 'mon_ot', 'tues_ot']
      );
    }
    return this.reduceObject(filteredValues);
  }
  reduceObject(obj) {
    const newArr = [];
    obj.forEach(val => newArr.push(val));
    return newArr.reduce((acc, curr) => acc + curr);
  }
  calcTotals(type: string) {
    const totalHours = [];
    const formObjectValues = <FormArray>this.timeForm.controls['hours'].value;
    for (const value in formObjectValues) {
      if (formObjectValues.hasOwnProperty(value)) {
        totalHours.push(this.filterObjectToArray(formObjectValues[value], [type])[0]);
      }
    }
    return totalHours.reduce((acc, curr) => acc + curr);
  }
  calcCost(index) {
    const arr = <FormArray>this.timeForm.controls['hours'].value[index];
    const regRate: any = this.filterObjectToArray(arr, ['rate'])[0];
    const otRate: any = this.filterObjectToArray(arr, ['rate_ot'])[0];
    const regHours: any = this.filterObjectToArray(arr, ['reg_hrs'])[0];
    const otHours: any = this.filterObjectToArray(arr, ['ot_hrs'])[0];
    return (regRate * regHours) + (otHours * otRate);
    // console.log(regHours, otHours, otRate, regRate);
  }
  addNewRow(): void {
    const control = <FormArray>this.timeForm.controls['hours'];
    control.push(this.createRow());
    // this.hours = this.timeForm.get('hours') as FormArray;
    // this.hours.push(this.createHours());
  }
  filterObjectToArray(obj, arr) {
    const newObj = {};
    arr.forEach(element => {
      if (obj.hasOwnProperty(element)) {
        newObj[element] = obj[element];
      }
    });
    return Object.values(newObj);
  }
  deleteRow(index): void {
    const control = <FormArray>this.timeForm.controls['hours'];
    control.removeAt(index);
  }
  onFormSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    const proj_id = this.route.snapshot.paramMap.get('proj_id');
    this.timesheet = this.timeForm.value;
    this.projectService.addTime(id, proj_id, this.timesheet).subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.message, {cssClass: 'alert-success', timeout: 3000});
        this.router.navigateByUrl(`/companies/${id}/projects/${proj_id}`);
      } else {
        this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigateByUrl(`/companies/${id}/projects/${proj_id}`);
      }
    });
  }
}
