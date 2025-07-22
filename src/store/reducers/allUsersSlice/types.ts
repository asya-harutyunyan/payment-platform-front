import { User } from "@/common/types";
import { createReferralsOrderSchema } from "@/schema/wallet_details.schema";
import { z } from "zod";
import {
  ReferralOfUser,
  RefferedUsersList,
} from "../user-info/depositSlice/types";

export interface UserState {
  loading: boolean;
  lastPageRefList: number;
  error: string | null;
  users: User[];
  freezedUsers: User[];
  blockedUsers: User[];
  user: User | null;
  freezedUser: User | null;
  pandingOrders: pangingOrder[];
  currentPage: number | null;
  lastPage: number | null;
  total: number;
  banks: BankNames[];
  referred_users_list: ReferedUsersListRequest[];
  referralUsersForAdmin: RefferedUsersList[];
  amount_to_pay: string;
  total_amount: string;
  referralUser: ReferralOfUser[];
  referralUsersForAdminPagination: ReferralAdminPagination;
  systemConfigState: {
    loading?: boolean;
    data?: TGetSystemConfigThunkResponse;
  };
  activeUsersState: {
    loading?: boolean;
    data?: TGetActiveActiveUsersThunkResponse;
  };
  getReferralOrdersState: {
    loading?: boolean;
    data?: TGetReferralOrdersResponse["data"];
  };
  getUserReferralsOrdersState: {
    loading?: boolean;
    data?: TGetReferralsOrdersThunkResponse["data"];
  };
}
export interface pangingOrder {
  id: string;
  created_at: string;
  status?: string;
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
  referral_id?: string | number;
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
  role?: string;
  search?: string;
  sort?: "ASC" | "DESC";
  to?: string;
  from?: string;
  month?: string;
}
export interface PaginatedUsersResponse {
  data: UsersList[];
  currentPage: number;
  lastPage: number;
}

export enum EConfigNames {
  registration_limit = "registration_limit",
}

export type TCreateSystemConfigThunkOptions = {
  name: EConfigNames;
  is_enabled: boolean;
  config: {
    name: EConfigNames;
    registration_limit: number;
    registration_time_minutes: number;
  };
};

export type TCreateSystemConfigThunkResponse = {
  message: string;
  data: {
    name: EConfigNames;
    is_enabled: boolean;
    config_data: {
      name: EConfigNames;
      registration_limit: number;
      registration_time_minutes: number;
    };
    updated_at: string;
    created_at: string;
    id: number;
  };
};

export type TGetSystemConfigThunkResponse = {
  id: number;
  name: EConfigNames;
  config?: {
    name: EConfigNames;
    registration_limit: number;
    registration_time_minutes: number;
  };
  is_enabled: boolean;
};
export type TGetSystemConfigThunkError =
  | { message: string; status?: number }
  | string;

export type TGetSystemConfigThunkOptions = {
  name: EConfigNames;
};

export type TUpdateSystemConfigThunkResponse = {
  message: string;
  data: {
    id: number;
    name: EConfigNames;
    config_data: {
      name: EConfigNames;
      registration_limit: number;
      registration_time_minutes: number;
    };
    is_enabled: boolean;
    created_at: string;
    updated_at: string;
  };
};

export type TUpdateSystemConfigThunkOptions = TCreateSystemConfigThunkOptions;

export type TGetActiveActiveUsersThunkResponse = {
  count: number;
  users: Array<User>;
};

export type TCreateRefOrderThunkOptions = z.infer<
  typeof createReferralsOrderSchema
>;

export type TChangeAndReassignCardOptions = {
  bank_detail_id: number;
  card_number: string;
  bank_name: string;
  currency?: "RUB" | "USD" | "EUR";
};

export type TChangeAndReassignCardResponse = {
  message: string;
  new_bank_detail: BankDetail;
};

export type TGetReferralOrdersResponse = {
  data: Array<{
    // this two only for typescript
    id?: string;
    created_at?: string;

    user: {
      id: number;
      name: string;
      email: string;
    };
    orders: Array<{
      id: number;
      request_amount: string;
      currency_of_payment: string;
      payment_status: string;
      transaction_hash?: string;
      payment_method?: string;
    }>;
  }>;
};

export type TGetReferralOrdersOptions = void;

export type TAcceptReferralOrderThunkResponse = unknown;
export type TAcceptReferralOrderThunkOptions =
  | {
      referral_order_id: number;
    }
  | {
      user_id: number;
    };

export type TGetReferralsOrdersThunkResponse = {
  data: {
    user: {
      id: number;
      name: string;
      email: string;
    };
    orders: Array<
      {
        id: number;
        created_at?: string;
        request_amount: string;
        currency_of_payment: string;
        payment_status: string;
      } & (
        | { transaction_hash: null; payment_method: string }
        | { transaction_hash: string; payment_method: null }
      )
    >;
  };
};
export type TGetReferralsOrdersThunkOptions = void;
