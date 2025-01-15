import * as z from "zod";
export const price_schema = z.object({
  price: z.string().min(50, "Minimum 50$"),
});
