import { z } from "@/common/validation";

export const deposit_id_schema = z.object({
  processing_amount: z.preprocess((a) => {
    if (typeof a !== "string" && typeof a !== "number") {
      return NaN;
    }
    const strValue = String(a).trim();
    if (/^0\d+/.test(strValue)) {
      return NaN;
    }
    const num = parseFloat(strValue);
    return isNaN(num) ? NaN : num;
  }, z.number().positive().min(1)),
});

export const deposit_id_confirm_schema = z.object({
  processing_amount: z.number().min(1),
});
