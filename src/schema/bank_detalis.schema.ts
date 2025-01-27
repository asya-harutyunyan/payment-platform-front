import * as z from "zod";

export const bank_detalis_schema = z.object({
  bank_name: z.string().min(3, "Code must be at least 3 characters"),
  first_name: z.string().min(3, "Code must be at least 3 characters"),
  last_name: z.string().min(3, "Code must be at least 3 characters"),
  card_number: z.string().min(3, "Code must be at least 3 characters"),
});
