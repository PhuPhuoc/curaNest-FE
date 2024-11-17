import z from "zod";


// Customer register
export const RegisterBody = z.object({
    address: z.string(),
    citizen_id: z.string(),
    city: z.string(),
    district: z.string(),
    dob: z.string(),
    full_name: z.string(),
    phone_number: z.string(),
    ward: z.string()
});
export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const RegisterRes = z.object({
  data: z.object({
    user_id: z.string(),
    address: z.string(),
    citizen_id: z.string(),
    city: z.string(),
    district: z.string(),
    dob: z.string(),
    full_name: z.string(),
    phone_number: z.string(),
    ward: z.string(),
    email: z.string(),
    avatar: z.string(),
    created_at: z.string()
  }),
  message: z.string(),
  status: z.number(),
});
export type RegisterResType = z.TypeOf<typeof RegisterRes>;


// Create Patient Profile
export const createProfileProfileBody = z.object({
  address: z.string(),
  avatar: z.string(),
  citizen_id: z.string(),
  city: z.string(),
  district: z.string(),
  dob: z.string(),
  full_name: z.string(),
  phone_number: z.string(),
  ward: z.string(),
  medical_description: z.string(),
  note_for_nurses: z.string(),
  techniques: z.string().array(), 
});
export type createProfileProfileBodyType = z.TypeOf<typeof createProfileProfileBody>;

export const createProfileProfileRes = z.object({
  data: z.object({
    id: z.string(),
    address: z.string(),
    avatar: z.string(),
    citizen_id: z.string(),
    city: z.string(),
    district: z.string(),
    dob: z.string(),
    full_name: z.string(),
    phone_number: z.string(),
    ward: z.string(),
    medical_description: z.string(),
    note_for_nurses: z.string(),
    techniques: z.string().array(), 
  }),
  message: z.string(),
  status: z.number(),
});
export type createProfileProfileResType = z.TypeOf<typeof createProfileProfileRes>;