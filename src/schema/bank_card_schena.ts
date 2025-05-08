import dayjs from "dayjs";
import { z } from "zod";

export const bank_card_schema = z.object({
  currency: z.string(),
  bank_name: z.string(),
  card_holder: z.string(),
  card_number: z.string(),
  name: z.string(),
  month: z
    .custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), {
      message: "Invalid date format",
    })
    .optional(),
});
