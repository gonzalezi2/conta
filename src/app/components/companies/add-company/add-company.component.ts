import { Component, OnInit, Input, Output } from '@angular/core';
import { ValidateCompanyService} from '../../../services/validate-company.service';
import { Http, Headers } from '@angular/http';

import { Router } from '@angular/router';
import { Company } from '../../../models/Company';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from 'events';
import { CompanyService } from '../../../services/company.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  constructor(
    private http: Http,
    private router: Router,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private flashMessage: FlashMessagesService
  ) { }
  private company: Company;
  companyForm: FormGroup;
  ngOnInit() {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      address: [''],
      contact: [''],
      email: [''],
      phone: [''],
      website: [''],
      isActive: ['']
    });
  }

  onFormSubmit() {
    // validate required fields
    if (this.companyForm.valid) {

      this.companyService.addCompany(this.companyForm.value).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.message, {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/companies']);
        } else {
          this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/companies/add']);
        }
      });
    }
  }



}
