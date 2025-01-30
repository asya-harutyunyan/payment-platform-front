import { z } from "@/common/validation";

export const add_card_schema = z.object({
  bank_name: z.string().min(3),
  card_holder: z.string().min(3),
  phone_number: z.string().min(3),
  card_number: z
    .string()
    .transform((val) => val.replace(/\s+/g, ""))
    .refine((val) => /^\d{16}$/.test(val), {
      message: "Card number must be 16 digits",
    }),
});
export const edit_card_schema = z.object({
  id: z.number(),
  bank_name: z.string().min(3),
  card_holder: z.string().min(3),
  phone_number: z.string().min(3),
  card_number: z
    .string()
    .transform((val) => val.replace(/\s+/g, ""))
    .refine((val) => /^\d{16}$/.test(val), {
      message: "Card number must be 16 digits",
    }),
});
export const choose_card_schema = z.object({
  payment_method_id: z.string().min(1),

  // z.preprocess((a) => {
  //   if (!a) {
  //     return -1;
  //   }
  //   return parseFloat(a as string);
  // }, z.number().positive().min(1)),
});
