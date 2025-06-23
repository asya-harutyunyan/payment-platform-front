import { z } from "@/common/validation";

export const login_schema = z.object({
  email: z.string().email().max(50),
  password: z.string().min(3),
  otp: z.string().optional(),
});
