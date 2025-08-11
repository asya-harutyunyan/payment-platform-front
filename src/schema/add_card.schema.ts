import { z } from "zod";

export const add_card_schema = z
  .object({
    bank_name: z
      .object({
        name: z.string(),
        id: z.number(),
        key: z.string(),
      })
      .refine((data) => data && data.name && data.name.trim().length > 0, {
        message: "Имя банка не может быть пустым",
      }),
    card_holder: z
      .string()
      .min(1, "Введите имя и фамилию латинскими буквами")
      .regex(
        /^[A-Za-z\s]+$/,
        "Имя и фамилия должны содержать только буквы латиницы и пробел"
      )
      .refine((val) => val.trim().split(/\s+/).length >= 2, {
        message: "Введите имя и фамилию латинскими буквами",
      }),
    bank_name_manual: z.string().optional().or(z.literal("")),
    card_number: z
      .string()
      .min(1, "Введите номер карты")
      .transform((val) => val.replace(/\s+/g, ""))
      .refine((val) => /^\d{13,19}$/.test(val), {
        message: "Номер карты должен содержать от 13 до 19 цифр",
      }),
    currency: z.string().min(1, "Выберите способ оплаты"),
  })
  .superRefine((data, ctx) => {
    if (
      data.bank_name.name === "Другое" &&
      (!data.bank_name_manual || data.bank_name_manual.trim() === "")
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "При выборе «Другое» требуется указать название банка вручную",
        path: ["bank_name_manual"],
      });
    }
  });

export const edit_card_schema = z.object({
  id: z.number(),
  bank_name: z
    .object({
      name: z.string(),
      id: z.number(),
      key: z.string(),
    })
    .refine((data) => data && data.name && data.name.trim().length > 0, {
      message: "Имя банка не может быть пустым",
    }),
  card_holder: z
    .string()
    .min(1, "Введите имя и фамилию латинскими буквами")
    .regex(
      /^[A-Za-z\s]+$/,
      "Имя и фамилия должны содержать только буквы латиницы и пробел"
    )
    .refine((val) => val.trim().split(/\s+/).length >= 2, {
      message: "Введите имя и фамилию латинскими буквами",
    }),
  card_number: z
    .string()
    .min(1, "Введите номер карты")
    .transform((val) => val.replace(/\s+/g, ""))
    .refine((val) => /^\d{13,19}$/.test(val), {
      message: "Номер карты должен содержать от 13 до 19 цифр",
    }),
  currency: z.string().min(1, "Выберите способ оплаты"),
});

export const choose_card_schema = z.object({
  payment_method_id: z.string().min(1),
});
