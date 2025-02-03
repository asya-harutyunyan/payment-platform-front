import { z } from "@/common/validation";
export const login_schema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});
