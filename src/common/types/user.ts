import {
  DataDeposits,
  Order,
} from "@/store/reducers/user-info/depositSlice/types";

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  email_verified_at?: string;
  role: "admin" | "client" | "superAdmin";
  referral: {
    referral_code: string;
  };
  key?: string;
  created_at: string;
  updated_at: string;
  bank_details: BankDetail[];
  permissions: string[];
  deposits: {
    data: DataDeposits[];
    amount_payed: string;
    profit: string;
    total_amount: string;
  };
  current_orders: {
    data: Order[];
  };
}
export interface Wallet {
  processing_amount: string;
  profits: string;
  total: number;
}
export interface BankDetail {
  id: number;
  user_id: number;
  bank_name: string;
  card_holder: string;
  is_blocked: number;
  card_number: string;
  created_at: string;
  updated_at: string;
  currency: string;
}
