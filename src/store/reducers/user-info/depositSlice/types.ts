import { User } from "@/common/types";
import { DEPOSIT_TYPES } from "@/components/organisms/earn-money-steps/third-step/enums";
import { deposit_limit_schema } from "@/schema/limit.schema";
import { deposit_id_schema } from "@/schema/price.schema";
import { wallet_usdt_details_schema } from "@/schema/wallet_details.schema";
import { z } from "zod";

export interface DepositState {
  loading: boolean;
  error: string | null;
  deposit: Deposit | null;
  depositsAdmin: DataDeposits[];
  //todo
  singleDeposit: Deposit | [];
  singleOrder?: Order;
  deposits: DataDeposits[];
  orders: Order[];
  currentPage: number | null;
  lastPage: number;
  total: number;
  price: number;
  depositHistory: DepositLimits[];
  manageDepositLimitHistory: ManageLimit[];
  notificationData?: {
    order: {
      order_id: number | string;
      created_at: string;
      user_id: number | string;
      amount: number;
    };
  };
  paginationDepositHistory: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  paginationAdminPage: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export type AmountType = z.infer<typeof deposit_id_schema>;
export type WalletDetalisType = z.infer<typeof wallet_usdt_details_schema>;
export type LimitType = z.infer<typeof deposit_limit_schema>;

export type Deposit = {
  id: number;
  user_id: number;
  wallet_id: number;
  status_by_client: string;
  status_by_admin: string;
  deposit_id?: number;
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

export interface DepositLimits {
  id: number;
  action: string;
  role: "superAdmin" | "admin" | "manager" | string;
  date: string;
  created_at: string;
  updated_at?: string | null;
  by_email: string;
  by_fullname: string;
  by_name: string;
  by_surname: string;
  to_email: string;
  to_fullname: string;
  to_name: string;
  to_surname: string;
}
export interface DepositLimitsrequest {
  page: string | number;
  per_page: string | number;
  by_fullname: string;
  by_email: string;
  to_email: string;
  to_fullname: string;
  action: string;
  role: string;
  to: string;
  from: string;
  date: string;
  sort: string;
}
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
export interface Platipay {
  amount: string;
  status_by_client: string;
  status_order?: string;
  transaction_id: string;
  created_at: string;
}
export interface RefferedUsersList {
  name: string;
  percentage: string;
  surname: string;
  email: string;
  referral_percentage: string;
  total_amount: string;
  ref_count: string;
  referral_code: string;
  user_id: string;
  referral_id: string;
  key: string;
  id?: number;
  created_at?: string;
  amount_to_pay?: string;
  amount_payment?: string;
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
  user_id: number;
  id: number;
  is_blocked: number;
  phone_number: string;
  user?: User;
  created_at?: string;
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
  user?: User;
}
export interface DataDeposits {
  id?: number;
  status_by_admin?: string;
  created_at?: string;
  status_by_admin_row?: string;
  done_arrow?: string;
  status_by_user_row?: string;
  final_status?: string;
  address: string;
  left_amount?: string;
  currency: string;
  type?: string;
  key?: string;
  network: string;
  qr_code: string;
  name: string;
  surname: string;
  email: string;
  processing_amount: string;
  status: string;
  user: User;
  blocked_card: string;
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
export interface DepositRequest {
  page?: number;
  per_page?: number;
  name?: string;
  surname?: string;
  month?: string;
  status_by_admin?: string;
  type?: string;
  from?: string;
  amount?: string;
  to?: string;
  sort?: "ASC" | "DESC";
  email?: string;
  role?: string;
}

export interface ManageLimitRequest {
  page?: number;
  per_page?: number;
  limit?: number | string;
  role?: string;
  user_id?: number;
  email?: string;
  name?: string;
  surname?: string;
  created_at?: string | null;
  updated_at?: string | null;
  sort?: "ASC" | "DESC";
  user?: User;
}
export interface ManageLimit {
  limit?: number | string;
  role?: string;
  email?: string;
  name?: string;
  surname?: string;
  sort?: "ASC" | "DESC";
}
export interface UpdateLimit {
  limit: string;
  user_id: string;
}
