import { deposit_id_schema } from "@/schema/price.schema";
import { wallet_usdt_details_schema } from "@/schema/wallet_details.schema";
import { z } from "zod";

export interface OrderState {
  loading: boolean;
  error: string | null;
  orders: Order[];
  currentPage: number | null;
  lastPage: number | null;
  total: number;
  price: number;
  singleOrder: Order;
  order: Order[];
  notificationData?: {
    order: {
      order_id: number | string;
      created_at: string;
      user_id: number | string;
      amount: number;
    };
  };
}

export type AmountType = z.infer<typeof deposit_id_schema>;
export type WalletDetalisType = z.infer<typeof wallet_usdt_details_schema>;

export interface Wallet {
  id: number;
  key?: string;
  address: string;
  currency: string;
  network: string;
  created_at: string;
  updated_at: string;
  qr_code: string;
}

export interface RefferedUsersList {
  name: string;
  surname: string;
  email: string;
  referral_percentage: string;
  total_amount: string;
  ref_count: string;
  referral_code: string;
}
export interface ReferralOfUser {
  name: string;
  surname: string;
  email: string;
  amount: string;
}
export interface BankCardsDetalis {
  bank_name: string;
  card_holder: string;
  card_number: string;
  name?: string;
  surname?: string;
  currency: string;
  id: number;
  is_blocked: number;
  phone_number: string;
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

export interface Order {
  id: number;
  order_status_admin?: string;
  order_status_user?: string;
  wallet_id: number;
  order_delete?: string;
  key?: string;
  type?: string;
  email?: string;
  status?: string;
  user_id: number;
  left_amount?: string;
  final_status?: string;
  transaction_id?: string;
  card_number?: string;
  amount_order?: string;
  deposit_id: number;
  amount: string;
  status_by_client: string;
  status_by_admin: string;
  created_at: string;
  updated_at: string;
  name: string;
  surname: string;
  initial_ammount: number;
}

export interface OrderRequest {
  page: number;
  per_page: number;
  status_by_client?: string;
  name?: string;
  surname?: string;
  amount?: string;
  sort?: "ASC" | "DESC";
}
