import { z } from "zod";

export const bank_card_schema = z.object({
  currency: z.string(),
  bank_name: z.string(),
  card_holder: z.string(),
  card_number: z.string(),
});
