import { Component, OnInit, Input, Output } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Company } from '../../../models/Company';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {
  @Output() company: Company;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.companyService.getCompanyById(id).subscribe(data => {
      this.company = data.company;
    },
    err => {
      console.log(err);
      return false;
    }
    );
  }

}
