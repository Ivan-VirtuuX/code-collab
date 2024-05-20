import * as z from "zod";

export const LoginSchema = z.object({
  login: z
    .string({ required_error: "Логин обязателен" })
    .min(2, "Логин должен быть минимум 2 символа"),
  password: z.string().min(6, "Пароль должен быть минимум 6 символов"),
});

export const RegisterSchema = z
  .object({
    login: z.string().min(2, "Логин должен быть минимум 2 символа"),
    password: z.string().min(6, "Пароль должен быть минимум 6 символов"),
    secondPassword: z.string().min(6, "Пароль должен быть минимум 6 символов"),
  })
  .refine((data) => data.password === data.secondPassword, {
    path: ["secondPassword"],
    message: "Пароли не совпадают",
  });
