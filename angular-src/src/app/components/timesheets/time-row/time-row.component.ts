import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../../models/Employee';

@Component({
  selector: '[app-time-row]',
  templateUrl: './time-row.component.html',
  styleUrls: ['./time-row.component.css']
})
export class TimeRowComponent implements OnInit {

  @Input() public employees: [Employee];
  constructor() { }

  ngOnInit() {
  }

}
