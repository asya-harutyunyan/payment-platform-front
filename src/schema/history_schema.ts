import dayjs from "dayjs";
import { z } from "zod";

export const history_schema = z.object({
  by_name: z.string(),
  by_surname: z.string(),
  by_email: z.string(),
  to_name: z.string(),
  to_surname: z.string(),
  to_email: z.string(),
  action: z.string(),
  role: z.string(),
  date: z.string(),
  month: z
    .custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), {
      message: "Invalid date format",
    })
    .optional(),
});
