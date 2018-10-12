import { Employee } from './Employee';

export class Timesheet {
  date: Date;
  time: [{
    employee: Employee
    hours: {
      wed: Number,
      wed_ot: Number,
      thurs: Number,
      thurs_ot: Number,
      fri: Number,
      fri_ot: Number,
      sat: Number,
      sat_ot: Number,
      sun: Number,
      sun_ot: Number,
      mon: Number,
      mon_ot: Number,
      tues: Number,
      tues_ot: Number,
      rate: Number,
      rate_ot: Number,
      reg_hrs: Number,
      ot_hrs: Number,
      tot_cost: Number
    };
    tot_hrs: Number,
    tot_ot: Number,
    tot_cost: Number
  }];
}
