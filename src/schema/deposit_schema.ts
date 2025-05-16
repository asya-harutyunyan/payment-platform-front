import { z } from "zod";

export const deposit_schema = z.object({
  status_by_admin: z.string(),
  type: z.string(),
  name: z.string(),
  surname: z.string(),
  from: z.any().optional(),
  to: z.any().optional(),
  amount: z.string(),
});
