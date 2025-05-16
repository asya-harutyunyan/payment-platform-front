import { z } from "zod";

export const filter_schema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  period: z.string(),
  referral_code: z.string(),
  // month: z
  //   .custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), {
  //     message: "Invalid date format",
  //   })
  //   .optional(),
  from: z.any().optional(),
  to: z.any().optional(),
});
export const search_schema = z.object({
  search: z.string(),
});
export const new_users_schema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  from: z.any().optional(),
  to: z.any().optional(),
});
