import * as z from "zod";
import { password_regex } from "./password.regex";

export const reset_schema = z.object({
  email: z.string().email("Invalid email address"),
});
export const change_password_schema = z.object({
  email: z.string().email("Invalid email address"),
  two_factor_code: z.string().min(3, "Code must be at least 3 characters"),
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
});
