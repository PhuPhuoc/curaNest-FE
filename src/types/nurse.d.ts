export type Nurse = {
  user_id: string;
  avatar:string;
  full_name: string;
  current_workplace: string;
  expertise: string;
  techniques: string[];
};

export type NurseRes = {
  status: number;
  message: string;
  data: Nurse[];
};

export type Technique = {
  id: string;
  name: string;
};

export type DetailNurse = {
  email: string;
  user_name: string;
  avatar: string;
  user_id: string;
  citizen_id: string;
  full_name: string;
  phone_number: string;
  current_workplace: string;
  expertise: string;
  certificate: string;
  education_level: string;
  work_experience: string;
  slogan: string;
  techniques: Technique[];
};

export type DetailNurseRes = {
  status: number;
  message: string;
  data: DetailNurse;
};
