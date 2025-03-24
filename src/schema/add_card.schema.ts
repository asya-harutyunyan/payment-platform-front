import { z } from "zod";

export const add_card_schema = z
  .object({
    bank_name: z
      .object({
        name: z.string(),
        id: z.number(),
        key: z.string(),
      })
      .required(),
    card_holder: z
      .string()
      .min(3)
      .max(50)
      .regex(/^[A-Za-z\s]+$/, "Разрешены только английские буквы и пробелы"),
    bank_name_manual: z.string().optional(),
    // phone_number: z.string().refine((val) => !val || val.length >= 3, {
    //   message: "Если поле указано, должно быть не менее 3 символов.",
    // }),
    card_number: z
      .string()
      .transform((val) => val.replace(/\s+/g, ""))
      .refine((val) => /^\d{16}$/.test(val), {
        message: "Номер карты должен состоять из 16 цифр",
      }),
    currency: z.string().min(3).max(50),
  })
  .superRefine((data, ctx) => {
    if (data.bank_name.name === "Другое" && !data.bank_name_manual) {
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
    .required(),
  card_holder: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[A-Za-z\s]+$/, "Разрешены только английские буквы и пробелы"),
  // phone_number: z
  //   .string()
  //   .optional()
  //   .refine((val) => !val || val.length >= 3, {
  //     message: "Если поле указано, должно быть не менее 3 символов.",
  //   }),
  card_number: z
    .string()
    .transform((val) => val.replace(/\s+/g, ""))
    .refine((val) => /^\d{16}$/.test(val)),
  currency: z.string().min(3).max(50),
});

export const choose_card_schema = z.object({
  payment_method_id: z.string().min(1),
});
