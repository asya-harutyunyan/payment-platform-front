import * as z from "zod";

export const add_card_schema = z.object({
  bank_name: z.string().min(3, "Code must be at least 3 characters"),
  card_holder: z.string().min(3, "Code must be at least 3 characters"),
  phone_number: z.string().min(3, "Code must be at least 3 characters"),
  card_number: z.string().min(3, "Code must be at least 3 characters"),
});

export const choose_card_schema = z.object({
  payment_method_id: z.string().min(3, "Code must be at least 3 characters"),
});
