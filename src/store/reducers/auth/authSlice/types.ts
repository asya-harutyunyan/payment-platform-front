import { authSchema } from "@/components/molecules/auth/sign-up-form";
import { z } from "zod";

export interface AuthState {
  loading: boolean;
  error: string | null;
}
export type RegisterUserType = z.infer<typeof authSchema>;
