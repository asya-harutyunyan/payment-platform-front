import { User } from "@/common/types";

export interface WalletState {
  loading: boolean;
  error: string | null;
  wallet: [];
  per_page: number;
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
}
