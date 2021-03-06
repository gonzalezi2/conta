import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { CompanyService } from './services/company.service';
import { EmployeeService } from './services/employee.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// Companies
import { CompaniesComponent } from './components/companies/companies.component';
import { AddCompanyComponent } from './components/companies/add-company/add-company.component';
import { ViewCompanyComponent } from './components/companies/view-company/view-company.component';
import { EditCompanyComponent } from './components/companies/edit-company/edit-company.component';
import { CompanyCardComponent } from './components/companies/company-card/company-card.component';
// Employees
import { EmployeesComponent } from './components/employees/employees.component';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
// Projects
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectService } from './services/project.service';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';
import { ViewProjectComponent } from './components/projects/view-project/view-project.component';
import { EditProjectComponent } from './components/projects/edit-project/edit-project.component';
// Timesheets
import { TimesheetsComponent } from './components/timesheets/timesheets.component';
import { AddTimeComponent } from './components/timesheets/add-time/add-time.component';
import { TimeRowComponent } from './components/timesheets/time-row/time-row.component';
// Income
import { IncomeComponent } from './components/income/income.component';
import { AddIncomeComponent } from './components/income/add-income/add-income.component';
// Expenses
import { ExpensesComponent } from './components/expenses/expenses.component';
import { AddExpenseComponent } from './components/expenses/add-expense/add-expense.component';

const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'companies', component: CompaniesComponent},
  {path: 'companies/add', component: AddCompanyComponent },
  {path: 'companies/:id', component: ViewCompanyComponent},
  {path: 'companies/:id/edit', component: EditCompanyComponent},
  {path: 'companies/:id/projects', component: ProjectsComponent},
  {path: 'companies/:id/projects/add', component: AddProjectComponent},
  {path: 'companies/:id/projects/:proj_id', component: ViewProjectComponent},
  {path: 'companies/:id/projects/:proj_id/edit', component: EditProjectComponent},
  {path: 'companies/:id/projects/:proj_id/add-time', component: AddTimeComponent},
  {path: 'companies/:id/projects/:proj_id/add-income', component: AddIncomeComponent},
  {path: 'companies/:id/projects/:proj_id/add-expense', component: AddExpenseComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'employees/add', component: AddEmployeeComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    EmployeesComponent,
    CompaniesComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    ViewCompanyComponent,
    AddEmployeeComponent,
    ProjectsComponent,
    AddProjectComponent,
    ViewProjectComponent,
    TimesheetsComponent,
    AddTimeComponent,
    TimeRowComponent,
    IncomeComponent,
    AddIncomeComponent,
    ExpensesComponent,
    AddExpenseComponent,
    CompanyCardComponent,
    EditProjectComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [CompanyService, EmployeeService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
