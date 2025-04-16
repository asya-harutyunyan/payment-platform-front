import { User } from "@/common/types";
import { change_password_schema } from "@/schema/change_password.schema";
import { comfirm_email_schema } from "@/schema/comfirm_email.schema";
import { login_schema } from "@/schema/login.schema";
import { auth_schema } from "@/schema/sign_up.schema";
import { z } from "zod";

export interface AuthState {
  loading: boolean;
  error: string | null;
  email: "";
}
export type RegisterUserType = z.infer<typeof auth_schema>;
export type LoginUserType = z.infer<typeof login_schema>;
export type ConfirmEmailType = z.infer<typeof comfirm_email_schema>;
export type ChangePassword = z.infer<typeof change_password_schema>;

export type FetchUserResponseType = {
  user: User;
  wallet: {
    profits: number;
    processing_amount: number;
    total: number;
  };
};
