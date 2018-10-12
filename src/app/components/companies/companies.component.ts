import { Component, OnInit, Output } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/Company';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  @Output()
  public companies: Company[] = [];
  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.companyService.getAllCompanies().subscribe(data => {
      this.companies = data.companies;
    },
    err => {
      console.log(err);
      return false;
    }
    );
  }

}
