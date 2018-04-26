import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Project } from '../../models/Project';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnChanges {
  @Input() public project: Project;
  totalIncome = 0;
  constructor(
  ) { }

  // ngOnInit() {
  //   // this.project.income.forEach(income => {
  //   //   console.log(income.amount);
  //   // });
  //   console.log(this.project);
  //   console.log(this.totalIncome);
  // }

  ngOnChanges(changes: SimpleChanges ) {
    this.project.income.forEach(income => {
      this.totalIncome += income.amount.valueOf();
    });
  }

}
