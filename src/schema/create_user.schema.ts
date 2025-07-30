import { EUserRole } from "@/components/organisms/auth/sign-in-form/_services/useSignIn";
import { z } from "zod";
import { password_regex } from "./password.regex";

export const create_permissions = z
  .object({
    name: z
      .string()
      .min(3, "Имя должно содержать минимум 3 символа")
      .max(15, "Имя не должно превышать 15 символов"),
    surname: z
      .string()
      .min(3, "Фамилия должна содержать минимум 3 символа")
      .max(15, "Фамилия не должна превышать 15 символов"),
    email: z
      .string()
      .email()
      .min(3, "Email должна содержать минимум 3 символа")
      .max(50, "Email не должен превышать 50 символов"),
    password: z
      .string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .regex(
        password_regex,
        "Пароль должен содержать как заглавные, так и строчные буквы, а также цифры"
      ),
    // .refine(
    //   (permissions) => {
    //     return permissions.some((permission) =>
    //       permission.match(new RegExp("view", "i"))
    //     );
    //   },
    //   {
    //     message:
    //       "Должен быть указан хотя бы один разрешенный доступ из просмотров",
    //   }
    // ),
  })
  .and(
    z.union([
      z.object({
        role: z.literal(EUserRole.Admin),
        permissions: z.array(z.string()),
        deposit_limit: z.string().optional(),
      }),
      z.object({
        role: z.enum([
          EUserRole.SupportLead,
          EUserRole.SupportOperator,
          EUserRole.SupportTrainee,
          EUserRole.TechnicalSpecialist,
        ]),
      }),
    ])
  );
