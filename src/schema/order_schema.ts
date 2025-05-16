import { z } from "zod";

export const order_schema = z.object({
  amount: z.string(),
  status_by_client: z.string(),
  status_client: z.string(),
  name: z.string(),
  surname: z.string(),
  status_by_admin: z.string(),
  card_number: z.string(),
  transaction_id: z.string(),
  from: z.any().optional(),
  to: z.any().optional(),
});
