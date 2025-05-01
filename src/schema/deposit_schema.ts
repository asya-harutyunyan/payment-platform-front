import dayjs from "dayjs";
import { z } from "zod";

export const deposit_schema = z.object({
  sort_by: z.string(),
  status_by_admin: z.string(),
  type: z.string(),
  name: z.string(),
  surname: z.string(),
  month: z
    .custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), {
      message: "Invalid date format",
    })
    .optional(),
});
