import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  projectForm: FormGroup;
  id: String;
  company_id: String;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('proj_id');
    this.company_id = this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(this.company_id, this.id).subscribe(data => {
      console.log(data);
      this.projectForm = this.fb.group({
        location: [data.project.location, Validators.required],
        contract: [data.project.contract],
        totalBalance: data.project.totalBalance,
        balance: [data.project.balance]
      });
    });
  }
  onFormSubmit() {
    // validate required fields
    if (this.projectForm.valid) {
      this.projectService.updateProject(this.company_id, this.id, this.projectForm.value).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.message, {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/companies', this.company_id, 'projects', this.id]);
        } else {
          this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }
  }

}
