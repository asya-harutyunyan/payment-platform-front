import { z } from "zod";

export const bank_card_schema = z.object({
  name_cards_member: z.string(),
  card_number: z.string(),
});
