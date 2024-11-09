import z from "zod";

export const AccountRes = z
  .object({
    data: z.object({
      id: z.string(),
      user_name: z.string(),
      email: z.string(),
      role: z.string(),
      avatar: z.string(),
    }),
    message: z.string(),
    status: z.number(),
  })
  .strict();

export type AccountResType = z.TypeOf<typeof AccountRes>;

export const UpdateMeBody = z.object({
  name: z.string().trim().min(2).max(256),
});

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>;
