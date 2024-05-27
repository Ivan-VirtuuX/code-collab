"use client";

import styles from "./EditProfileForm.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema } from "@/schemas/index";
import * as z from "zod";
import { IUser } from "@/types/User";
import { useRouter } from "next/navigation";
import { DefaultAvatar } from "@/ui/DefaultAvatar";
import { ChangeAvatarModal } from "@/components/ChangeAvatarModal";
import { useSession } from "next-auth/react";
import { Api } from "@/api";

type EditProfileFormValues = z.infer<typeof EditProfileSchema>;

interface EditProfileFormProps {
  user?: IUser;
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({ user }) => {
  const [error, setError] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [avatar, setAvatar] = React.useState(user?.avatarUrl);

  const { data: session, status, update } = useSession();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const router = useRouter();

  const form = useForm<EditProfileFormValues>({
    mode: "onChange",
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      login: user?.login,
      githubUrl: user?.githubUrl,
      location: user?.location,
      bio: user?.bio,
    },
  });

  const onSaveEditProfile = async (
    { login, githubUrl, location, bio }: EditProfileFormValues,
    e: any
  ) => {
    e.preventDefault();

    try {
      await Api().user.editProfile(login, bio, location, githubUrl);

      await update({
        login,
        githubUrl,
        location,
        bio,
      });
    } catch (err) {
      console.error(err);

      setError("Ошибка при сохранении профиля");
    }
  };

  return (
    <div>
      <form
        className={styles.form}
        onSubmit={form.handleSubmit(onSaveEditProfile)}
      >
        <div className="flex justify-between flex-wrap gap-5">
          <div
            className={`${styles.inputFieldsContainer} flex flex-col gap-10`}
          >
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
              <div className="flex flex-col">
                <label htmlFor="login" className={styles.label}>
                  Логин
                </label>
                <input
                  id="login"
                  {...form.register("login")}
                  className={styles.input}
                  type="text"
                  placeholder="Логин"
                />
              </div>
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
              <div className="flex flex-col">
                <label htmlFor="location" className={styles.label}>
                  Местоположение
                </label>
                <input
                  id="location"
                  {...form.register("location")}
                  className={styles.input}
                  type="text"
                  placeholder="Например г. Омск"
                />
              </div>
              {form.formState.errors.location && (
                <AnimatePresence>
                  <motion.div
                    className={styles.warning}
                    layout
                    initial={{ opacity: 0, x: -400, scale: 0.5 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 200, scale: 1.2 }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    {form.formState.errors.location.message}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
            <div className={styles.inputContainer}>
              <div className="flex flex-col">
                <label htmlFor="githubUrl" className={styles.label}>
                  Ссылка на github
                </label>
                <input
                  id="githubUrl"
                  {...form.register("githubUrl")}
                  className={styles.input}
                  type="text"
                  placeholder="Ссылка на профиль GitHub"
                />
              </div>
              {form.formState.errors.githubUrl && (
                <AnimatePresence>
                  <motion.div
                    className={styles.warning}
                    layout
                    initial={{ opacity: 0, x: -400, scale: 0.5 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 200, scale: 1.2 }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    {form.formState.errors.githubUrl.message}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
          <div
            className={`${styles.avatarContainer} relative flex justify-center`}
          >
            <div className={styles.avatar}>
              {avatar ? <img src={avatar} alt="avatar" /> : <DefaultAvatar />}
            </div>
            <ChangeAvatarModal
              handleChangeAvatar={(avatarUrl) => setAvatar(avatarUrl)}
            />
          </div>
        </div>
        <div className="mt-10">
          <div className="flex flex-col">
            <label htmlFor="bio" className={styles.label}>
              Обо мне
            </label>
            <textarea
              id="bio"
              {...form.register("bio")}
              className={styles.textarea}
              placeholder="Расскажите о себе"
            />
          </div>
          {form.formState.errors.location && (
            <AnimatePresence>
              <motion.div
                className={styles.warning}
                layout
                initial={{ opacity: 0, x: -400, scale: 0.5 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 200, scale: 1.2 }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                {form.formState.errors.location.message}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        <div className={`${styles.buttons} flex flex-wrap gap-4 mt-10`}>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            Сохранить
          </button>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => router.back()}
          >
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
};
