import { z } from "@/common/validation";

export const wallet_usdt_details_schema = z.object({
  deposit_id: z.number(),
  transaction_id: z.string().nullable(),
});
export const wallet_type_schema = z.object({
  type: z.string(),
});
