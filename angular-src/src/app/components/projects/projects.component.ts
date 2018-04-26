import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Company } from '../../models/Company';
import { Project } from '../../models/Project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  @Input() public company: Company;
  public projects: [Project];
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.getAllProjects(id).subscribe(data => {
      console.log(data);
      this.company = this.company;
      this.projects = data.projects;
    },
    err => {
      console.log(err);
      return false;
    }
    );
  }
}
