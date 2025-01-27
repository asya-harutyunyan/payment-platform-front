import { z } from "@/common/validation";
export const login_schema = z.object({
  email: z.string(),
  password: z.string().min(3, "Password must be at least 6 characters"),
});
