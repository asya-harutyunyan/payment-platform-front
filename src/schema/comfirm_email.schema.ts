import { z } from "@/common/validation";
export const comfirm_email_schema = z.object({
  two_factor_code: z.string(),
});
