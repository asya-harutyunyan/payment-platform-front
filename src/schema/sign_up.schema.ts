import { z } from "zod";
import { password_regex } from "./password.regex";

export const auth_schema = z
  .object({
    name: z
      .string()
      .min(3, "Имя должно содержать минимум 3 символа")
      .max(15, "Имя не должно превышать 15 символов"),
    surname: z
      .string()
      .min(3, "Фамилия должна содержать минимум 3 символа")
      .max(15, "Фамилия не должна превышать 15 символов"),
    email: z.string().email().max(50, "Email не должен превышать 50 символов"),
    referral_code: z.string(),
    password: z
      .string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .regex(
        password_regex,
        "Пароль должен содержать как заглавные, так и строчные буквы, а также цифры"
      ),
    password_confirmation: z
      .string()
      .min(6, "Подтверждение пароля должно содержать минимум 6 символов"),
    checkbox: z.boolean().refine((val) => val === true, {
      message: "Необходимо согласие с условиями",
    }),
    recaptcha_token: z.string().optional(),
    fingerprint: z.string().optional(),
    validation_token: z.string().nonempty(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Пароли не совпадают",
    path: ["password_confirmation"],
  });
