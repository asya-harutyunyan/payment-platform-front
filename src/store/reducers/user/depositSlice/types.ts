import {
  deposit_id_confirm_schema,
  deposit_id_schema,
} from "@/schema/price.schema";
import { z } from "zod";

export interface DepositState {
  loading: boolean;
  error: string | null;
  email: "";
}
export type ProcessingAmountType = z.infer<typeof deposit_id_schema>;
export type ProcessingAmountConfirmAndStatusType = z.infer<
  typeof deposit_id_confirm_schema
>;
