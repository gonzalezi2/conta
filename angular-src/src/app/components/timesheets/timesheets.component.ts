import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../models/Project';

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.css']
})
export class TimesheetsComponent implements OnInit {
  @Input() project: Project;
  constructor() { }

  ngOnInit() {
  }

}
