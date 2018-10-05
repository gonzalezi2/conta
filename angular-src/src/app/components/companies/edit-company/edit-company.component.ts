import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }
  companyForm: FormGroup;
  id: String;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.companyService.getCompanyById(this.id).subscribe(data => {
      this.companyForm = this.fb.group({
        name: [data.company.name, Validators.required],
        address: [data.company.address],
        contact: [data.company.contact],
        email: [data.company.email],
        phone: [data.company.phone],
        website: [data.company.website],
        isActive: [data.company.isActive]
      });
      console.log(this.companyForm);
    });
  }
  onFormSubmit() {
    // validate required fields
    if (this.companyForm.valid) {

      this.companyService.updateCompany(this.companyForm.value, this.id).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.message, {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/companies']);
        } else {
          this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }
  }

}
