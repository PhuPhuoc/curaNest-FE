
export type infoCustomer = {
  email: string;
  user_name: string;
  avatar: string;
  user_id: string;
  citizen_id: string;
  full_name: string;
  phone_number: string;
  dob: string;
  ward: string;
  district: string;
  city: string;
  address: string;
  created_at: string;
};

export type infoCustomerRes = {
  status: number;
  message: string;
  data: infoCustomer;
};

// Patient
export type Technique = {
  id: string;
  name: string;
};

export type infoPatient = {
  id: string;
  avatar: string;
  citizen_id: string;
  full_name: string;
  phone_number: string;
  dob: string;
  old: number;
  address: string;
  techniques: Technique[];
};

export type infoPatientRes = {
  status: number;
  message: string;
  data: infoPatient;
};