import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Company } from '../../models/Company';
import { Project } from '../../models/Project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  @Input()
  public projects: Project[];
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }
}
