import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Company } from '../../../models/Company';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {
  company: Company;

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
