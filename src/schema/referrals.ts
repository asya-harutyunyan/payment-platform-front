import { z } from "zod";

export const percent_referral_schema = z.object({
  referral_percentage: z.string(),
  referral_id: z.string(),
  user_id: z.string(),
});
