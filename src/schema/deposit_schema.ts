import { z } from "zod";

export const deposit_schema = z.object({
  sort_by: z.string(),
  status_by_admin: z.string(),
  type: z.string(),
  name: z.string(),
  surname: z.string(),
});
