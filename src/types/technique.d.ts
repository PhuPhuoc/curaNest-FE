export type Technique = {
  id: string;
  name: string;
  estimated_time: string;
  fee: number;
};

export type CreateTechnique = {
  name: string;
  estimated_time: string;
  fee: number;
};

export type TechniqueRes = {
  status: number;
  message: string;
  data: Technique[];
};

export type CreateRes = {
  status: number;
  message: string;
};

export type Service = {
  estimated_time: string;
  fee: number;
  name: string;
};

export interface FormData {
  name: string;
  fee: string;
  estimated_time: string;
}
