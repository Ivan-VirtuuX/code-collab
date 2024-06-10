"use client";

import React from "react";
import styles from "./AuthForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { LoginSchema, RegisterSchema } from "@/schemas/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  type: "register" | "login";
}

type RegisterFormValues = z.infer<typeof RegisterSchema>;
type LoginFormValues = z.infer<typeof LoginSchema>;

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [error, setError] = React.useState("");

  const router = useRouter();

  const registerForm = useForm<RegisterFormValues>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      login: "",
      password: "",
      secondPassword: "",
    },
  });

  const loginForm = useForm<LoginFormValues>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmitRegister: SubmitHandler<RegisterFormValues> = async (
    values
  ) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response?.ok) {
      await signIn("credentials", {
        login: values.login,
        password: values.password,
        callbackUrl: "/",
      });

      router.push("/collabs");
    } else {
      setError("Логин занят");
    }
  };

  const onSubmitLogin: SubmitHandler<LoginFormValues> = async (values) => {
    const response = await signIn("credentials", {
      login: values.login,
      password: values.password,
      callbackUrl: "/collabs",
      redirect: false,
    });

    if (response?.error && !response?.ok) setError(response.error);
    else window.location.assign("/");
  };

  const form = type === "register" ? registerForm : loginForm;

  const onFormSubmit =
    type === "register"
      ? registerForm.handleSubmit(onSubmitRegister)
      : loginForm.handleSubmit(onSubmitLogin);

  const registerField = (
    name: keyof RegisterFormValues | keyof LoginFormValues
  ) => {
    return type === "register"
      ? registerForm.register(name as keyof RegisterFormValues)
      : loginForm.register(name as keyof LoginFormValues);
  };

  return (
    <div className="flex justify-center my-10">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={onFormSubmit}>
          <p className={`${styles.title} text-center`}>
            {type === "register" ? "Регистрация" : "Авторизация"}
          </p>
          <div className="flex flex-col gap-5">
            {error && (
              <AnimatePresence>
                <motion.div
                  className={styles.error}
                  layout
                  initial={{ opacity: 0, x: -400, scale: 0.5 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 200, scale: 1.2 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  {error}
                </motion.div>
              </AnimatePresence>
            )}
            <div className={styles.inputContainer}>
              <input
                {...registerField("login")}
                className={styles.input}
                type="text"
                placeholder="Логин"
              />
              {form.formState.errors.login && (
                <AnimatePresence>
                  <motion.div
                    className={styles.warning}
                    layout
                    initial={{ opacity: 0, x: -400, scale: 0.5 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 200, scale: 1.2 }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    {form.formState.errors.login.message}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
            <div className={styles.inputContainer}>
              <input
                {...registerField("password")}
                className={styles.input}
                type="password"
                placeholder="Пароль"
              />
              {form.formState.errors.password && (
                <AnimatePresence>
                  <motion.div
                    className={styles.warning}
                    layout
                    initial={{ opacity: 0, x: -400, scale: 0.5 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 200, scale: 1.2 }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    {form.formState.errors.password.message}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
            {type === "register" && (
              <div className={styles.inputContainer}>
                <input
                  {...registerField("secondPassword")}
                  className={styles.input}
                  type="password"
                  placeholder="Повторите пароль"
                />
                {registerForm.formState.errors.secondPassword && (
                  <AnimatePresence>
                    <motion.div
                      className={styles.warning}
                      layout
                      initial={{ opacity: 0, x: -400, scale: 0.5 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 200, scale: 1.2 }}
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      {registerForm.formState.errors.secondPassword?.message}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            )}
          </div>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {type === "register" ? "Зарегистрироваться" : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
};
