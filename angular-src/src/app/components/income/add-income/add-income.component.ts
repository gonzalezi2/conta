import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css']
})
export class AddIncomeComponent implements OnInit {

  constructor(
    private http: Http ,
    private projectService: ProjectService,
    private route: ActivatedRoute ,
    private router: Router ,
    private fb: FormBuilder ,
    private flashMessage: FlashMessagesService ) { }

  incomeForm: FormGroup;

  ngOnInit() {
    this.incomeForm = this.fb.group({
      date: [Date, Validators.required],
      check: '',
      amount: ['', Validators.required],
      description: ['']
    });
  }

  onFormSubmit() {
    // validate required fields
    const id = this.route.snapshot.paramMap.get('id');
    const proj_id = this.route.snapshot.paramMap.get('proj_id');
    if (this.incomeForm.valid) {
      this.projectService.addIncome(id, proj_id, this.incomeForm.value).subscribe(data => {
        console.log(data);
        console.log(this.incomeForm.value);
        if (data.success) {
          this.flashMessage.show(data.message, {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate([`/companies/${id}/projects/${proj_id}`]);
        } else {
          this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate([`/companies/${id}/projects/${proj_id}/add-income`]);
        }
      });
    }
  }

}
