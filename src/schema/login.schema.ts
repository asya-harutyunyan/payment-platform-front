import * as z from "zod";
export const login_schema = z.object({
  email: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
