export type Nurse = {
  user_id: string;
  avatar: string;
  full_name: string;
  current_workplace: string;
  expertise: string;
  phone_number: string;
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

export type WorkSchedule = {
  id: string;
  shift_date: string;
  shift_from: string;
  shift_to: string;
  status: string;
  appointment_id: string;
};

export type WorkScheduleRes = {
  status: number;
  message: string;
  data: WorkSchedule[];
};

export interface CreateNurseData {
  avatar: string | null;
  certificate: string;
  citizen_id: string;
  current_workplace: string;
  education_level: string;
  email: string;
  expertise: string;
  full_name: string;
  name: string;
  password: string;
  phone_number: string;
  slogan: string;
  techniques: string[];
  work_experience: string;
}

export type Shift = {
  shift_date: string; 
  shift_from: string; 
  shift_to: string;  
};

export interface CreateScheduleData {
  shifts: Shift[];   
  week_from: string; 
  week_to: string;  
}

export type CreateScheduleDataRes = {
  status: number;
  message: string;
  data: CreateScheduleData[];
};