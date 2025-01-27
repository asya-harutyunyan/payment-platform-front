import { z } from "@/common/validation";
import { password_regex } from "./password.regex";

export const reset_schema = z.object({
  email: z.string().email(),
});
export const change_password_schema = z.object({
  email: z.string().email(),
  two_factor_code: z.string().min(3),
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
