import { z } from "@/common/validation";

export const add_card_schema = z.object({
  bank_name: z.string().min(3),
  card_holder: z.string().min(3),
  phone_number: z.string().min(3),
  card_number: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
});

export const choose_card_schema = z.object({
  payment_method_id: z.string().min(1),
});
