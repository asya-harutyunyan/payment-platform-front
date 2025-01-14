import * as z from "zod";
export const comfirm_email_schema = z.object({
  two_factor_code: z.string(),
});
