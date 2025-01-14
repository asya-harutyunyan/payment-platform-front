import { comfirm_email_schema } from "@/schema/comfirm_email.schema";
import { login_schema } from "@/schema/login.schema";
import { auth_schema } from "@/schema/signUp.schema";
import { z } from "zod";

export interface AuthState {
  loading: boolean;
  error: string | null;
}
export type RegisterUserType = z.infer<typeof auth_schema>;
export type LoginUserType = z.infer<typeof login_schema>;
export type ConfirmEmailType = z.infer<typeof comfirm_email_schema>;
