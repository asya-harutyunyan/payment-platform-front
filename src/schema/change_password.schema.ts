import { z } from "@/common/validation";
import { password_regex } from "./password.regex";

export const reset_schema = z.object({
  email: z.string().email().max(50),
});
export const change_password_schema = z.object({
  email: z.string().email().max(50),
  two_factor_code: z.string().min(3),
  password: z.string().min(6).regex(password_regex),
  password_confirmation: z.string().min(6),
});
