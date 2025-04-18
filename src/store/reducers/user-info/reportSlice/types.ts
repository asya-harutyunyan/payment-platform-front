export interface ReportsState {
  loading: boolean;
  error: string | null;
  newRegisteredUsers: NewUsers[];
  currentPage: number | null;
  last_page: number | null;
  total: number;
}

export type NewRegisteredUsersResponse = {
  data: NewUsers[];
  page: number;
  per_page: number;
  sort: "ASC" | "DESC";
  currentPage: number | null;
  last_page: number | null;
  total: number;
};

export type NewRegisteredUsers = {
  page: number;
  per_page: number;
  sort: "ASC" | "DESC";
};
export type NewUsers = {
  name: string;
  surname: string;
  created_at: string;
  email: string;
};
