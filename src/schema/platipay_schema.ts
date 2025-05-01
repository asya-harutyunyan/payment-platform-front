import dayjs from "dayjs";
import { z } from "zod";

export const platipay_schema = z.object({
  amount: z.string(),
  status_by_client: z.string(),
  transaction_id: z.string(),
  month: z
    .custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), {
      message: "Invalid date format",
    })
    .optional(),
});
