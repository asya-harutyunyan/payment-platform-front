import { DEPOSIT_TYPES } from "@/components/organisms/earn-money-steps/third-step/enums";
import { deposit_id_schema } from "@/schema/price.schema";
import { wallet_usdt_details_schema } from "@/schema/wallet_details.schema";
import { z } from "zod";

export interface DepositState {
  loading: boolean;
  error: string | null;
  deposit: Deposit | null;
  //todo
  singleDeposit: Deposit | [];
  singleOrder: Order | [];
  deposits: DataDeposits[];
  orders: Order[];
  currentPage: number | null;
  lastPage: number | null;
  total: number;
  price: number;
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

export type Deposit = {
  id: number;
  user_id: number;
  wallet_id: number;
  status_by_client: string;
  status_by_admin: string;
  amount: number;
  processing_amount: string;
  converted_amount: number;
  final_status: string;
  created_at: string;
  updated_at: string;
  payment_method_id?: number | string;
  transaction_id?: string;
  wallet: Wallet;
  type?: DEPOSIT_TYPES;
  payment_method?: PaymentMethod;
  deposit_currency?: string;
};

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
  key?: string;
  type?: string;
  email?: string;
  status?: string;
  user_id: number;
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
export interface DataDeposits {
  id?: number;
  status_by_admin?: string;
  status_by_admin_row?: string;
  status_by_user_row?: string;
  final_status?: string;
  address: string;
  currency: string;
  type?: string;
  key?: string;
  network: string;
  qr_code: string;
  name: string;
  surname: string;
  email: string;
  processing_amount: number;
  status: string;
}
//TODO:must be change
export interface Deposits {
  current_page: number;
  data: DataDeposits[];
  first_page_url: string;
  from: unknown;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: unknown;
  path: string;
  per_page: number;
  prev_page_url: unknown;
  to: unknown;
  total: number;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}
