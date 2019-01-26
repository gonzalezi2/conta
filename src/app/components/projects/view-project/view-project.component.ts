import { Component, OnInit, Input, Output } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Company } from '../../../models/Company';
import { Project } from '../../../models/Project';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  public companyId;
  public project = new Project();

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.companyId = this.route.snapshot.paramMap.get('id');
    const proj_id = this.route.snapshot.paramMap.get('proj_id');
    this.projectService.getProject(id, proj_id).subscribe(data => {
      this.project = data.project;
    },
    err => {
      console.log(err);
      return false;
    }
    );
  }

}
