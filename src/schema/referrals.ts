import { z } from "zod";

export const percent_referral_schema = z.object({
  percentage: z
    .string()
    .refine((val) => /^\d+(\.\d+)?$/.test(val), "Введите корректное число")
    .refine((val) => parseFloat(val) >= 1, "Минимальное значение — 1"),
  user_id: z.string().nonempty("User ID обязателен"),
});
