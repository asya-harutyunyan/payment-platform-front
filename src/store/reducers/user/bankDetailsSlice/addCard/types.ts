import { add_card_schema, edit_card_schema } from "@/schema/add_card.schema";
import { z } from "zod";

export interface DepositState {
  loading: boolean;
  error: string | null;
}
export type AddCardType = z.infer<typeof add_card_schema>;
export type EditCardType = z.infer<typeof edit_card_schema>;
