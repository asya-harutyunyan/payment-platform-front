import { add_card_schema, edit_card_schema } from "@/schema/add_card.schema";
import { z } from "zod";

export interface DepositState {
  loading: boolean;
  error: string | null;
  bankCards: BankCardsDetails[];
  blockedCards: BankCardsDetails[];
  total: number;
}
export interface BankCardsDetails {
  bank_name: string;
  card_holder: string;
  card_number: string;
  currency: string;
  id: number;
  is_blocked: number;
  phone_number: string;
  user_id: number | string;
  name?: string;
  surname?: string;
}
export interface GetBankDetailsRequest {
  page: number;
  per_page?: number;
  name?: string;
  surname?: string;
  bank_name?: string;
  card_holder?: string;
  card_number?: string;
  sort?: "ASC" | "DESC";
}

export type AddCardType = z.infer<typeof add_card_schema>;
export type EditCardType = z.infer<typeof edit_card_schema>;
