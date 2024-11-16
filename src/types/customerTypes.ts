export interface ICustomerState {
  id: string;
  identityNumber: string;
  serialNumber: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  registrationAddress: string;
  birthDate: string;
  phoneNumber: string;
  actualAddress: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export interface ICustomerSliceState {
  customers: ICustomerState[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}
