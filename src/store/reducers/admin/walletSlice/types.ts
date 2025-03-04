import { User } from "@/common/types";
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
}
