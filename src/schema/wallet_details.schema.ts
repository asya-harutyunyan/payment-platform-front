import { z } from "@/common/validation";
import { ECurrencyRefOrder } from "@/components/organisms/partner-program/_serivces/usePartnerProgram";

export const wallet_usdt_details_schema = z.object({
  deposit_id: z.number(),
  transaction_id: z.string().nullable(),
});
export const wallet_type_schema = z.object({
  type: z.string(),
});

export const gen_code_type_schema = z.object({
  type: z.string().optional(),
  payment_method_id: z.string().optional(),
  transaction_id: z.string().optional(),
});

export const createReferralsOrderSchema = z
  .object({
    request_amount: z.string(),
  })
  .and(
    z.union([
      z.object({
        currency_of_payment: z.literal(ECurrencyRefOrder.USDT),
        transaction_hash: z.string(),
      }),
      z.object({
        currency_of_payment: z.literal(ECurrencyRefOrder.RUB),
        payment_method_id: z.number(),
      }),
    ])
  );
