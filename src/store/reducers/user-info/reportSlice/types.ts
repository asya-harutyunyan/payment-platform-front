import { DEPOSIT_STATUSES } from "@/enum/deposit.status.enum";
import { Order } from "../depositSlice/types";

export interface ReportsState {
  loading: boolean;
  error: string | null;
  newRegisteredUsers: NewUsers[];
  currentPage: number | null;
  last_page: number | null;
  total: number;
  platipay: Platipay[];
  orderSummary: Summary;
  orders_platformX: Order[];
  orders_stats: DepositStates;
  report_users: ReportUsers[];
  adminSummary: Summary;
  singleOrder?: Order[];
  admingetProcessedAmounts: AdmingetProcessedAmounts;
}
export interface AdmingetProcessedAmounts {
  payment_method_count: string;
  total_amount: string;
  profits: string;
  crypto_deposits: string;
  card_deposits: string;
  orders_done_amount: string;
  orders_in_progress_amount: string;
}
export interface Summary {
  expiredCount: string;
  active_cards: number;
  deposited_amounts: number;
  expiredAmount: number;
  not_deposited_yet_amount: number;
}
export interface DepositStates {
  total_amount: string;
  total_amount_with_deposit: string;
  total_done_ammount: string;
  order_count: string;
  donee_order_ammount: string;
  order_witouth_card_count: string;
}
export interface OrderDeposit {
  active_cards: number;
  deposited_amounts: number;
  not_deposited_yet_amount: number;
  expiredAmount: number;
}
export type NewRegisteredUsersResponse = {
  data: NewUsers[];
  page: number;
  per_page: number;
  sort: "ASC" | "DESC";
  currentPage: number | null;
  last_page: number | null;
  total: number;
};

export type NewRegisteredUsers = {
  page: number;
  per_page: number;
  sort: "ASC" | "DESC";
  name?: string;
  surname?: string;
  email?: string;
};
export type NewUsers = {
  name: string;
  surname: string;
  created_at: string;
  amount?: string;
  email: string;
};

export type PlatformX = {
  amount: string;
  created_at: string;
};

export type ReportUsers = {
  name: string;
  surname: string;
  blocked_cards: string;
  wallet_total: string;
  total_cards: string;
  email: string;
};

export interface Platipay {
  amount: string;
  status_by_client: string;
  transaction_id: string;
  created_at: string;
}
export interface GetPlatformXRequest {
  page: number;
  per_page?: number;
  status_by_client?: DEPOSIT_STATUSES;
  start_date: string;
  end_date: string;
}
