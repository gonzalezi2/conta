import { Component, Input, OnChanges } from '@angular/core';
import { Project } from '../../models/Project';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnChanges {
  @Input() project: Project;
  public totalIncome: any = 0;

  constructor() { }

  ngOnChanges(): void {
    if (this.project.income) {
      this.project.income.forEach(income => {
        this.totalIncome += income.amount;
      });
    }

  }

}
