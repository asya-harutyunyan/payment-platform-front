import { z } from "zod";
import { password_regex } from "./password.regex";

export const auth_schema = z.object({
  name: z.string().min(3),
  surname: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6).regex(password_regex),
  password_confirmation: z.string().min(6),
  checkbox: z.boolean(),
});
