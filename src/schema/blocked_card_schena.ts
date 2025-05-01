import dayjs from "dayjs";
import { z } from "zod";

export const blocked_card_schema = z.object({
  name: z.string(),
  surname: z.string(),
  bank_name: z.string(),
  card_holder: z.string(),
  card_number: z.string(),
  currency: z.string(),
  month: z
    .custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), {
      message: "Invalid date format",
    })
    .optional(),
});
