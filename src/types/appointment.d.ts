export interface CreateAppointmentData {
  appointment_date: string;
  listNurseWorkSchedules: string[];
  nurse_id: string;
  patient_id: string | null;
  techniques: string;
  time_from_to: string;
  total_fee: number;
}

export type CreateAppointmentDataRes = {
  status: number;
  message: string;
  data: CreateAppointmentData[];
};
