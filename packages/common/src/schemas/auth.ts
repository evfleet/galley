import { z } from "zod";

export type Register = z.infer<typeof registerSchema>;

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// duplicate incase extending registerSchema in the future
export type Login = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
