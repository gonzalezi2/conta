import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnChanges {
  @Input() public project;
  totalExpense: Number = 0;

  constructor() { }

  ngOnChanges() {
    this.project.expenses.forEach(expense => {
      this.totalExpense += expense.amount;
    });
  }

}
