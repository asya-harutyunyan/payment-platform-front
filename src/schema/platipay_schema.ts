import { z } from "zod";

export const platipay_schema = z.object({
  amount: z.string(),
  status_by_client: z.string(),
  transaction_id: z.string(),
  from: z.any().optional(),
  to: z.any().optional(),
});
