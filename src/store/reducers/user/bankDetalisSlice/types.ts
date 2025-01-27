import { bank_detalis_schema } from "@/schema/bank_detalis.schema";
import { deposit_id_confirm_schema } from "@/schema/price.schema";
import { z } from "zod";

export interface DepositState {
  loading: boolean;
  error: string | null;
  email: "";
}
export type ProcessingAmountType = z.infer<typeof bank_detalis_schema>;
export type ProcessingAmountConfirmAndStatusType = z.infer<
  typeof deposit_id_confirm_schema
>;
