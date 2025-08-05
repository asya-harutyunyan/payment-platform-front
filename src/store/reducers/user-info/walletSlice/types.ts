import { User } from "@/common/types";
import { DEPOSIT_STATUSES } from "@/enum/deposit.status.enum";
import { Wallet } from "../depositSlice/types";

export interface WalletState {
  loading: boolean;
  error: string | null;
  wallet: Wallet[];
  currentPage: number | null;
  lastPage: number | null;
  total: number;
}

export interface WalletList {
  data: User[];
}

export interface CreateWallet {
  address: string;
  currency: string;
  network: string;
}
export interface Pagination {
  id?: string | number;
  page?: number;
  per_page?: number;
  status_by_client?: DEPOSIT_STATUSES | string;
  search?: string;
  name?: string;
  surname?: string;
  email?: string;
  period?: string;
  month?: string;
  amount?: string;
  card_number?: string;
  referral_code?: string;
  transaction_id?: string;
  from?: string;
  to?: string;
  blocked_card?: string;
  total_card?: string;
  earned_amount?: string;
  paid_amount?: string;
  deposit_amount?: string;
  sort?: "ASC" | "DESC";
}
export interface FilterWallet {
  page: number;
  per_page?: number;
  address?: string;
  currency?: string;
  network?: string;
  month?: string;
  from?: string;
  to?: string;
  sort?: "ASC" | "DESC";
}
