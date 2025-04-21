import { User } from "@/common/types";
import { DEPOSIT_STATUSES } from "@/enum/deposit.status.enum";
import { Wallet } from "../../user-info/depositSlice/types";

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
export interface GetWalletRequest {
  page: number;
  per_page?: number;
  status_by_client?: DEPOSIT_STATUSES;
}
export interface GetPlatformXRequest {
  page: number;
  per_page?: number;
  status_by_client?: DEPOSIT_STATUSES;
  start_date: string;
  end_date: string;
}
