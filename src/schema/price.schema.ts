import { z } from "@/common/validation";
export const deposit_id_schema = z.object({
  processing_amount: z.string(),
});

export const deposit_id_confirm_schema = z.object({
  processing_amount: z.string(),
});
