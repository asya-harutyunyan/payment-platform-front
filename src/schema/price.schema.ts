import { z } from "@/common/validation";

export const deposit_id_schema = z.object({
  amount: z.preprocess(
    (a) => {
      if (a === undefined || a === null || a === "") {
        return undefined;
      }
      if (typeof a !== "string" && typeof a !== "number") {
        return undefined;
      }
      const strValue = String(a).trim();
      if (/^0\d+/.test(strValue)) {
        return undefined;
      }
      const num = parseFloat(strValue);
      return isNaN(num) ? undefined : num;
    },
    z
      .number({ required_error: "Обязательное поле" })
      .positive("Ожидается положительное число")
      .min(50, "Минимальная сумма — 50")
  ),
});

export const deposit_id_confirm_schema = z.object({
  processing_amount: z.number().min(1),
});
