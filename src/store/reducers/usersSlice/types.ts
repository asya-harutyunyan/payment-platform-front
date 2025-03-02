import { User } from "@/common/types";

export interface UserState {
  loading: boolean;
  error: string | null;
  users: User[];
  user: User | null;
  per_page: number;
  currentPage: number | null;
  lastPage: number | null;
  total: number;
  banks: BankNames[];
}
type BankNames = {
  id: number | string;
  name: string;
};

export interface UsersList {
  current_page: number;
  data: User[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
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
}
export interface GetUsersRequest {
  page: number;
  per_page?: number;
}
export interface PaginatedUsersResponse {
  data: UsersList[];
  currentPage: number;
  lastPage: number;
}
