import * as z from "zod";

const loginRegex = /^(?!\d)[a-zA-Z0-9._-]+$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z_\d@$!%*?&]{6,}$/;

export const LoginSchema = z.object({
  login: z
    .string({ required_error: "Логин обязателен" })
    .min(2, "Логин должен быть минимум 2 символа")
    .max(20, "Логин должен быть максимум 12 символов")
    .regex(
      loginRegex,
      "Логин может содержать только латинские буквы, цифры, точки, дефисы и подчеркивания и не должен начинаться с цифры"
    ),
  password: z.string().min(6, "Пароль должен быть минимум 6 символов"),
});

export const RegisterSchema = z
  .object({
    login: z
      .string()
      .min(2, "Логин должен быть минимум 2 символа")
      .max(20, "Логин должен быть максимум 12 символов")
      .regex(
        loginRegex,
        "Логин может содержать только латинские буквы, цифры, точки, дефисы и подчеркивания и не должен начинаться с цифры"
      ),
    password: z
      .string()
      .min(6, "Пароль должен быть минимум 6 символов")
      .regex(
        passwordRegex,
        "Пароль должен содержать минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ"
      ),
    secondPassword: z
      .string()
      .min(6, "Пароль должен быть минимум 6 символов")
      .regex(
        passwordRegex,
        "Пароль должен содержать минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ"
      ),
  })
  .refine((data) => data.password === data.secondPassword, {
    path: ["secondPassword"],
    message: "Пароли не совпадают",
  });

const githubUrlRegex = /^https:\/\/github\.com\/[a-zA-Z0-9-]+$/;

export const EditProfileSchema = z.object({
  login: z
    .string({ required_error: "Логин обязателен" })
    .min(2, "Логин должен быть минимум 2 символа")
    .max(20, "Логин должен быть максимум 12 символов")
    .regex(
      loginRegex,
      "Логин может содержать только латинские буквы, цифры, точки, дефисы и подчеркивания и не должен начинаться с цифры"
    ),
  location: z
    .string()
    .max(20, "Местоположение должно быть максимум 20 символов")
    .optional()
    .transform((value) =>
      value && !value.startsWith("г. ") ? `г. ${value}` : value
    ),
  githubUrl: z
    .string()
    .optional()
    .refine((value) => !value || githubUrlRegex.test(value), {
      message: "Недействительная ссылка на GitHub",
    }),
  bio: z
    .string()
    .max(1000, "Био должно быть максимум 1000 символов")
    .optional(),
});
