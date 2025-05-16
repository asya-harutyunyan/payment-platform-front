import { z } from "zod";

export const history_schema = z.object({
  by_fullname: z.string(),
  by_email: z.string(),
  to_fullname: z.string(),
  to_email: z.string(),
  action: z.string(),
  role: z.string(),
  date: z.string(),
  from: z.any().optional(),
  to: z.any().optional(),
});
