import { Component, OnInit, Input, Output } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Project } from '../../../models/Project';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  constructor(
    private http: Http,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private flashMessage: FlashMessagesService) { }

    private project: Project;
    projectForm: FormGroup;

  ngOnInit() {
    this.projectForm = this.fb.group({
      location: ['', Validators.required],
      contract: [''],
      totalBalance: '',
      balance: ['']
    });
  }

  onFormSubmit() {
    // validate required fields
    const id = this.route.snapshot.paramMap.get('id');
    if (this.projectForm.valid) {
      this.projectService.addProject(id, this.projectForm.value).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.message, {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate([`/companies/${id}`]);
        } else {
          this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate([`/companies/${id}/projects/add`]);
        }
      });
    }
  }
}
