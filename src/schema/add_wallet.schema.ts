import { z } from "@/common/validation";

export const add_wallet_schema = z.object({
  address: z.string().min(3),
  network: z.string().min(3),
  currency: z.string().min(3),
});
