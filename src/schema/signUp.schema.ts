import { z } from "zod";
import { password_regex } from "./password.schema";

export const auth_schema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      password_regex,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  password_confirmation: z
    .string()
    .min(6, "Password must be at least 6 characters"),
  checkbox: z.boolean(),
});
