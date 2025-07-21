import { User } from "@/common/types";
import { Wallet } from "@/common/types/user";
import { EUserRole } from "@/components/organisms/auth/sign-in-form/_services/useSignIn";
import { change_password_schema } from "@/schema/change_password.schema";
import { comfirm_email_schema } from "@/schema/comfirm_email.schema";
import { login_schema } from "@/schema/login.schema";
import { auth_schema } from "@/schema/sign_up.schema";
import { z } from "zod";

export interface AuthState {
  loading: boolean;
  error: string | null;
  email: "";
  signInTFAErrorData: TSignInTFAErrorData | null;
  setupTwoFAData: TSetupTwoFAData | null;
  getUserRoleData: TGetUserRoleData | null;
}
export type RegisterUserType = z.infer<typeof auth_schema>;
export type LoginUserType = z.infer<typeof login_schema>;
export type ConfirmEmailType = z.infer<typeof comfirm_email_schema>;
export type ChangePassword = z.infer<typeof change_password_schema>;
export type TSignInTFAErrorData = z.infer<typeof twoFASchema>;
export type TSetupTwoFAData = TwoFASetupResponse;

export type FetchUserResponseType = {
  user: User;
  wallet: Wallet;
  permissions: string[];
};

export const twoFASchema = z.object({
  message: z.string(),
  setup_2fa_url: z.string(),
  token: z.string(),
  type: z.string(),
});

export type TwoFASetupResponse = {
  secret: string;
  qr_code_svg: string;
  qr_code_url: string;
  qr_code_base64: string;
};

// Add types for 2FA enable
export type TwoFAEnableOptions = {
  otp: string;
  secret: string;
};
export type IRoleInfo = {
  email: string;
  password: string;
};

export type TGetUserRoleData = { role: EUserRole; google2fa_enabled: boolean };
export type TGetUserRoleOptions = { email: string; password: string };

export const RECAPTCHA_ERROR_KEY = "INVALID_RECAPTCHA";

export const recaptchaErrorSchema = z.object({
  message: z.string(),
  key: z.enum([
    "GOOGLE2FA_REQUIRED",
    "GOOGLE2FA_ONE_TIME_CODE_REQUIRED",
    "GOOGLE2FA_INVALID_CODE",
    "RECAPTCHA_REQUIRED",
    "INVALID_RECAPTCHA",
    "REGISTRATION_SUCCESS",
    "TEMPORARY_BLOCK",
    "ACCOUNT_BLOCKED",
    "TEMPORARY_BLOCK",
  ]),
});
