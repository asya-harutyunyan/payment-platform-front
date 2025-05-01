import { z } from "@/common/validation";
import dayjs from "dayjs";

export const add_wallet_schema = z.object({
  address: z.string().min(3),
  network: z.string().min(3),
  currency: z.string().min(3),
  month: z
    .custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), {
      message: "Invalid date format",
    })
    .optional(),
});
