import z from "zod";

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

// export const LoginBody = z
//   .object({
//     email: z.string().email(),
//     password: z
//       .string()
//       .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
//       .max(100, { message: "Mật khẩu không được vượt quá 100 ký tự" }),
//   })
//   .strict();

// export type LoginBodyType = z.TypeOf<typeof LoginBody>;
