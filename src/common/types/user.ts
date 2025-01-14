export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  email_verified_at: string;
  role: "admin" | "client";
  created_at: string;
  updated_at: string;
}
