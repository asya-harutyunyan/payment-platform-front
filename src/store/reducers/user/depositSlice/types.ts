import {
  deposit_id_schema,
  wallet_details_schema,
} from "@/schema/wallet_details.schema";
import { z } from "zod";

export interface DepositState {
  loading: boolean;
  error: string | null;
  deposit: Deposit | null;
}
export type AmountType = z.infer<typeof deposit_id_schema>;
export type WalletDetalisType = z.infer<typeof wallet_details_schema>;

export type Deposit = {
  id: number;
  user_id: number;
  wallet_id: number;
  processing_amount: string;
  status_by_client: string;
  status_by_admin: string;
  final_status: string;
  created_at: string;
  updated_at: string;
  payment_method_id?: number;
  transaction_id?: string;
  wallet: Wallet;
  payment_method?: PaymentMethod;
};

export interface Wallet {
  id: number;
  address: string;
  currency: string;
  network: string;
  created_at: string;
  updated_at: string;
  qr_code: string;
}

export interface PaymentMethod {
  id: number;
  user_id: number;
  bank_name: string;
  first_name: string;
  last_name: string;
  card_number: string;
  created_at: string;
  updated_at: string;
}
