export class Employee {
  name: String;
  phone: String;
  rate: Number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
