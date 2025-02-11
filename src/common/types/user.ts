export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  email_verified_at?: string;
  role: "admin" | "client";
  created_at: string;
  updated_at: string;
  bank_details: BankDetail[];
}

export interface BankDetail {
  id: number;
  user_id: number;
  bank_name: string;
  card_holder: string;
  phone_number: string;
  card_number: string;
  created_at: string;
  updated_at: string;
  currency: string;
}
