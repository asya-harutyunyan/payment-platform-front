import { z } from "@/common/validation";

export const wallet_details_schema = z.object({
  deposit_id: z.number(),
  transaction_id: z.string().nullable(),
});
