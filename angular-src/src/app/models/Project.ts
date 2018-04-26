import { Timesheet} from './Timesheet';

export class Project {
  location: String;
  contract: Number;
  balance: Number;
  totalBalance: Number;
  income: [{
    check: String;
    amount: Number;
    date: Date
  }];
  expenses: [{
    date: Date,
    description: String,
    amount: Number
  }];
  timesheets: Timesheet[];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
