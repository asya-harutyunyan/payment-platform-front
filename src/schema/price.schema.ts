import { z } from "@/common/validation";

export const deposit_id_schema = z.object({
  processing_amount: z.preprocess((a) => {
    if (!a) {
      return 0;
    }
    return parseFloat(a as string);
  }, z.number().positive().min(1)),
});

export const deposit_id_confirm_schema = z.object({
  processing_amount: z.number().min(1),
});
