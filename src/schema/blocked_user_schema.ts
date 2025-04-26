import { z } from "zod";

export const blocked_user_schema = z.object({
  name: z.string(),
  surname: z.string(),
  bank_name: z.string(),
  card_holder: z.string(),
  card_number: z.string(),
});
