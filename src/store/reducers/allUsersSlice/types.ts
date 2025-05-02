import { User } from "@/common/types";
import {
  ReferralOfUser,
  RefferedUsersList,
} from "../user-info/depositSlice/types";

export interface UserState {
  loading: boolean;
  lastPageRefList: number;
  error: string | null;
  users: User[];
  blockedUsers: User[];
  user: User | null;
  currentPage: number | null;
  lastPage: number | null;
  total: number;
  banks: BankNames[];
  referred_users_list: ReferedUsersListRequest[];
  referralUsersForAdmin: RefferedUsersList[];
  referralUser: ReferralOfUser[];
  referralUsersForAdminPagination: ReferralAdminPagination;
}
export interface ReferedUsersListRequest {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  referral_user: ReferralUser;
  referral_percentage?: string;
  amount?: string;
  currency?: string;
}
export interface ReferralUser {
  amount: string;
  currency: string;
  referral_percentage: string;
  referral_id: string;
}
export interface PercentsData {
  user_id: string;
  percentage: string;
  referral_id: string;
}
export interface PriceData {
  user_id: string | number;
  amount_to_deduct: string | number;
  referral_id: string | number;
}
export interface ReferralAdminPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
export type BankNames = {
  id: number;
  name: string;
  key: string;
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
  // phone_number: string;
  card_number: string;
  created_at: string;
  updated_at: string;
}
export interface GetUsersRequest {
  page: number;
  per_page?: number;
  name?: string;
  surname?: string;
  email?: string;
  search?: string;
  sort?: "ASC" | "DESC";
  month?: string;
}
export interface PaginatedUsersResponse {
  data: UsersList[];
  currentPage: number;
  lastPage: number;
}
