import { z } from "zod";

export const deposit_limit_schema = z.object({
  limit: z.string(),
  user_id: z.string().nonempty("User ID обязателен"),
});

export const deposit_schema = z.object({
  name: z.string(),
  surname: z.string().nonempty("User ID обязателен"),
  email: z.string().email("Некорректный email").nonempty("Email обязателен"),
  role: z.string().nonempty("Роль обязателен"),
  limit: z.string().nonempty("Лимит обязателен"),
});
