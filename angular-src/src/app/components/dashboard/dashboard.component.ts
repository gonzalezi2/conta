import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/Company';
import { Project } from '../../models/Project';
import { ProjectService } from '../../services/project.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private companyService: CompanyService,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private flashMessage: FlashMessagesService
  ) {   }
  public companies: Company[] = [];
  public projects: Project[] = [];
  public employees: Employee[] = [];
  public balance = 0;
  public totContractAmt = 0;


  randomScalingFactor() {
    return Math.round(Math.random() * 100);
  }

  ngOnInit() {
    this.companyService.getAllCompanies()
    .subscribe(
      response => {
        this.companies = response.companies;
        console.log(this.companies);
        this.companies.forEach(company => {
          company.projects.forEach(project => {
            this.projects.push(project);
            this.balance += project.totalBalance.valueOf();
            this.totContractAmt += project.contract.valueOf();
          });
        });
      },
      err => {
        this.flashMessage.show(err, {cssClass: 'alert-success', timeout: 3000});
        return false;
      },
      () => console.log('complete')
    );
    this.employeeService.getAllEmployees().subscribe(response => {
      this.employees = response.employees;
    },
    err => {
      this.flashMessage.show(err, {cssClass: 'alert-success', timeout: 3000});
      return false;
    },
    () => console.log('completed the call')
  );
    const ctx = document.querySelector('#myChart');
    const data = {
      labels: [
          "Value A",
          "Value B"
      ],
      datasets: [
          {
              "data": [101342, 55342],   // Example data
              "backgroundColor": [
                  "#1fc8f8",
                  "#76a346"
              ]
          }]
  };

  const chart = new Chart(
      ctx,
      {
          "type": 'doughnut',
          "data": data,
          "options": {
              "cutoutPercentage": 50,
              "animation": {
                  "animateScale": true,
                  "animateRotate": false
              }
          }
      }
  );
}
}
