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
  page: number;
  per_page?: number;
  status_by_client?: DEPOSIT_STATUSES;
  search?: string;
  name?: string;
  surname?: string;
  email?: string;
  period?: string;
  sort_by?: "ASC" | "DESC";
  sort_order?: "ASC" | "DESC";
  sort?: "ASC" | "DESC";
}
export interface FilterWallet {
  page: number;
  per_page?: number;
  address?: string;
  currency?: string;
  network?: string;
  sort?: "ASC" | "DESC";
}
