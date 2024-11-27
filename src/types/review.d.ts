export type Review = {
  id: string;
  appointment_id: string;
  patient_name: string;
  rate: number;
  techniques: string;
  content: string;
  created_at: string;
};

export type ReviewRes = {
  status: number;
  message: string;
  data: Review[];
};
