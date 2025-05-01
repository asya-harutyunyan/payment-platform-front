import { z } from "zod";

export const order_schema = z.object({
  amount: z.string(),
  status_by_client: z.string(),
  name: z.string(),
  surname: z.string(),
  status_by_admin: z.string(),
  card_number: z.string(),
});
