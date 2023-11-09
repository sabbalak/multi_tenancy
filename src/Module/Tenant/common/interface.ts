import { TenantStatus } from './enum';

export interface Billing {
  email: string;
  mobile: string;
}

export interface Contact {
  email: string;
  mobile: string;
}

export interface Tenant {
  id: string;
  name: string;
  billing: Billing;
  contact: Contact;
  userCount: number;
  status: TenantStatus;
}
