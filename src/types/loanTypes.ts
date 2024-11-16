import { ICustomerState } from './customerTypes';

export interface ICustomerInfo {
  activityField: string;
  monthlyIncome: string;
  yearOfExperience: string;
  monthOfExperience: string;
  region: string;
  businessAddress: string;
}

export interface ICreditInfo {
  currency: string;
  purposeOfBusinessCredit: string;
  creditAmount: string;
  period: string;
  interest: string;
  status?: string;
  rejectionReason?: string;
}

export interface CustomerCreditInfo {
  customerId: string;
  customerInfo: ICustomerInfo;
  creditInfo: ICreditInfo;
  creditGuarantor: Array<ICustomerState>;
  creditCalculator: {
    sumOfTotalAmount: number;
  };
  loading: boolean;
  error: string | null;
}
