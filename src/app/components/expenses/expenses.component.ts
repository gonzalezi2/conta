import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Project } from '../../models/Project';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnChanges {
  @Input() project: Project;
  public totalExpense: any = 0;

  constructor() { }

  ngOnChanges() {
    if (this.project.expenses) {
      this.project.expenses.forEach(expense => {
        this.totalExpense += expense.amount;
      });
    }
  }

}
