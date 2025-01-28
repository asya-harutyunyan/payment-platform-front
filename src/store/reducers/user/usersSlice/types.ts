export interface UserState {
  loading: boolean;
  error: string | null;
  users: UsersList[];
  user: User | null;

  currentPage: number | null;
  lastPage: number | null;
}

export type User = {
  id: number;
  user_id: number;
};

export interface UsersList {
  id: number;
  name: string;
  surname: string;
  email: string;
  email_verified_at?: string;
  role: string;
  created_at: string;
  updated_at: string;
  bank_details: BankDetail[];
  currentPage: number;
  lastPage: number;
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
export interface GetUser {
  page: number;
  per_page: number;
}
export interface PaginatedUsersResponse {
  data: UsersList[];
  currentPage: number;
  lastPage: number;
}
