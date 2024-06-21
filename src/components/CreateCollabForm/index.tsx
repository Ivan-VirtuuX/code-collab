"use client";

import React from "react";
import { OutputData } from "@editorjs/editorjs";
import { PageTitle } from "@/components/PageTitle";
import { CreateIcon } from "@/ui/CreateIcon";

import styles from "./CreateCollabForm.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { getStackIcon } from "@/helpers/getStackIcon";

import { PlusIcon } from "./PlusIcon";
import { StackModal } from "@/components/StackModal";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { Api } from "@/api";
import { useRouter } from "next/navigation";

const Editor = dynamic(() => import("@/components/CollabEditor"), {
  ssr: false,
  loading: () => <div>Загрузка редактора...</div>,
});

export const CreateCollabForm = () => {
  const [isImageUploading, setIsImageUploading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [blocks, setBlocks] = React.useState<OutputData["blocks"]>([]);
  const [tags, setTags] = React.useState<string[]>([]);
  const [newTag, setNewTag] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [stackIcons, setStackIcons] = React.useState<string[]>([]);
  const [title, setTitle] = React.useState("");
  const [editorError, setEditorError] = React.useState<string>("");

  const router = useRouter();

  const { data: session, update } = useSession();

  const userRatingPoints = session?.user?.ratingPoints || 0;

  const saveButtonDisabled =
    isImageUploading ||
    !blocks.length ||
    isLoading ||
    blocks.filter((block) => block.type === "image").length > 10 ||
    !title ||
    title.length > 100;

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const onCreateCollab = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (blocks.length) {
        const collab = await Api().collab.create(
          stackIcons,
          title,
          blocks,
          tags
        );

        router.push(`/collabs/${collab.id}`);

        await update({ ...session, ratingPoints: userRatingPoints + 50 });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeEditorFields = (arr: OutputData["blocks"]) => {
    setBlocks(arr);
  };

  const onAddTag = () => {
    if (tags.some((tag) => tag === newTag)) return;
    if (tags.length >= 5) return;
    if (!newTag) return;

    setTags([...tags, newTag]);
    setNewTag("");
  };

  const onRemoveTag = (currentTag: string) => {
    setTags([...tags.filter((tag) => tag !== currentTag)]);
  };

  const handleSaveIcons = (icons: string[]) => {
    setStackIcons(icons);
  };

  const onClickStackIcon = (iconName: string) => {
    setStackIcons([
      ...stackIcons.filter((stackIconName) => stackIconName !== iconName),
    ]);
  };

  return (
    <div className="mt-11 mb-5">
      <PageTitle title="Создание коллабы">
        <CreateIcon />
      </PageTitle>
      <form className={styles.form} onSubmit={onCreateCollab}>
        <div className="flex flex-col gap-10">
          <div>
            {title.length > 100 && (
              <AnimatePresence>
                <motion.div
                  className={styles.editorError}
                  layout
                  initial={{ opacity: 0, x: -400, scale: 0.5 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 200, scale: 1.2 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  Максимальная длина заголовка - 100 символов
                </motion.div>
              </AnimatePresence>
            )}
            <p className={styles.title}>Заголовок</p>
            <input
              type="text"
              placeholder="Нужна помощь с ошибкой..."
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            {editorError && (
              <AnimatePresence>
                <motion.div
                  className={styles.editorError}
                  layout
                  initial={{ opacity: 0, x: -400, scale: 0.5 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 200, scale: 1.2 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  {editorError}
                </motion.div>
              </AnimatePresence>
            )}
            <p className={styles.title}>Текст</p>
            <div className={styles.editor}>
              <Editor
                onChange={onChangeEditorFields}
                setIsLoading={setIsImageUploading}
                setEditorError={setEditorError}
              />
            </div>
          </div>
          <div>
            <p className={styles.title}>Теги</p>
            <div className={`${styles.addTagContainer} relative`}>
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Введите тег"
                className={`${styles.input} ${styles.addTagInput}`}
              />
              <button
                className={styles.addTagButton}
                type="button"
                onClick={onAddTag}
                disabled={!newTag || tags.length >= 5}
              >
                Добавить
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <AnimatePresence key={tag}>
                  <motion.div
                    className={styles.error}
                    layout
                    initial={{ opacity: 0, x: -400, scale: 0.5 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 200, scale: 1.2 }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    <span
                      key={tag}
                      className={styles.tag}
                      onClick={() => onRemoveTag(tag)}
                    >
                      {tag}
                    </span>
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
          </div>
          <div>
            <p className={styles.title}>Технологии</p>
            <div className="flex">
              <div className="flex flex-wrap gap-4">
                <AnimatePresence>
                  <motion.div
                    layout
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 200, scale: 1.2 }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    <button
                      onClick={openModal}
                      type="button"
                      className={styles.selectStackIconsButton}
                    >
                      <PlusIcon />
                    </button>
                  </motion.div>
                </AnimatePresence>
                {stackIcons.map((iconName) => (
                  <AnimatePresence key={iconName}>
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: -400, scale: 0.5 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 200, scale: 1.2 }}
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      <div
                        className={styles.stackIconContainer}
                        onClick={() => onClickStackIcon(iconName)}
                      >
                        <img src={getStackIcon(iconName)} alt={iconName} />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ))}
                <StackModal
                  icons={stackIcons}
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  onSave={handleSaveIcons}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.buttons} flex flex-wrap gap-4 mt-12`}>
          <button
            type="submit"
            className={styles.saveButton}
            disabled={saveButtonDisabled}
            color="primary"
          >
            Сохранить
          </button>
          <button
            className={styles.backButton}
            onClick={() => router.push("/collabs")}
          >
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
};
