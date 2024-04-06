import { z } from "zod";

export type Register = z.infer<typeof registerSchema>;

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
