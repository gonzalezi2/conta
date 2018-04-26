import { Project } from './Project';

export class Company {
  name: String;
  address: String;
  contact: String;
  email: String;
  phone: String;
  website: String;
  isActive: Boolean;
  projects: [Project];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
