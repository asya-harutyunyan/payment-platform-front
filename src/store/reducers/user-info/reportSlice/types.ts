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
  done_count: string;
  progress_count: string;
  not_gived_count: string;
  expired_count: string;
  orderSummary: Summary;
  orders_platformX: Order[];
  orders_stats: DepositStates;
  report_users: ReportUsers[];
  history_last_page: number;
  adminSummary: Summary;
  history: HistoryData[];
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
  done_order_amount: string;
  order_witouth_card_count: string;

  done_order_count?: 1;
  orders_without_card_count?: 0;
  total_done_amount?: 370.49;
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
  from?: string;
  to?: string;
};
export type NewUsers = {
  name: string;
  surname: string;
  created_at: string;
  amount?: string;
  email: string;
  id?: number;
};

export type PlatformX = {
  amount: string;
  created_at: string;
};

export type ReportUsers = {
  name: string;
  surname: string;
  earned_amount: string;
  deposit_amount: string;
  paid_amount: string;
  blocked_cards: string;
  wallet_total: string;
  total_cards: string;
  email: string;
  id?: number;
  created_at?: string;
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
  from?: string;
  to?: string;
}
export interface PlatipayRequest {
  page: number;
  per_page?: number;
  amount?: string;
  status_by_client?: string;
  transaction_id?: string;
  sort?: "ASC" | "DESC";
  from?: string;
  to?: string;
}
export interface HistoryRequest {
  page?: number;
  per_page?: number;
  by_fullname?: string;
  by_email?: string;
  to_email?: string;
  to_fullname?: string;
  action?: string;
  role?: string;
  month?: string;
  date?: string;
  from?: string;
  to?: string;
  sort?: "ASC" | "DESC";
  created_at?: string;
}

export interface HistoryData {
  by_name: string;
  by_surname: string;
  by_email: string;
  action: string;
  date: string;
  to_name: string;
  to_surname: string;
  to_email: string;
  role: string;
}
