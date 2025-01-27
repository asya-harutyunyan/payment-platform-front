import * as z from "zod";
export const deposit_id_schema = z.object({
  processing_amount: z.string(),
});

export const wallet_details_schema = z.object({
  deposit_id: z.number(),
  transaction_id: z.string(),
});
