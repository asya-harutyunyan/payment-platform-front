import { z } from "zod";

export const filter_schema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  period: z.string(),
});
export const search_schema = z.object({
  search: z.string(),
});
export const new_users_schema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
});
