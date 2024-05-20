"use client";

import Editor from "@/components/CollabEditor";
import React from "react";
import { OutputData } from "@editorjs/editorjs";
import { useRouter } from "next/navigation";
import { PageTitle } from "@/components/PageTitle";
import { CreateIcon } from "@/ui/CreateIcon";

import styles from "./CreateCollabForm.module.scss";
import { IUser } from "@/types/User";
import { AnimatePresence, motion } from "framer-motion";
import { getStackIcon } from "@/helpers/getStackIcon";

import { PlusIcon } from "./PlusIcon";
import { StackModal } from "@/components/StackModal";

interface CreateCollabFormProps {
  user: IUser | undefined;
}

export const CreateCollabForm: React.FC<CreateCollabFormProps> = ({ user }) => {
  const [isImageSubmitting, setIsImageSubmitting] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [blocks, setBlocks] = React.useState<OutputData["blocks"]>([]);
  const [tags, setTags] = React.useState<string[]>([]);
  const [newTag, setNewTag] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [stackIcons, setStackIcons] = React.useState<string[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const router = useRouter();

  const onCreateCollab = async () => {
    try {
      setIsLoading(true);

      const obj = {
        body: blocks,
        id: user?.id,
      };

      if (blocks.length) {
        // await prismadb.collab.create({
        //   data: {
        //     authorId: user?.id,
        //     comments: undefined,
        //     title: "Untitled",
        //     tags: [],
        //     stack: [],
        //     body: [],
        //     viewsCount: 0,
        //   },
        // });

        await router.push("/collabs");
      }
    } catch (err) {
      console.warn(err);
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
    <div className="mt-11">
      <PageTitle title="Создание коллабы">
        <CreateIcon />
      </PageTitle>
      <form className={styles.form} onSubmit={onCreateCollab}>
        <div className="flex flex-col gap-10">
          <div>
            <p className={styles.title}>Заголовок</p>
            <input
              type="text"
              placeholder="Нужна помощь с ошибкой..."
              className={styles.input}
            />
          </div>
          <div>
            <p className={styles.title}>Текст</p>
            <div className={styles.editor}>
              <Editor onChange={onChangeEditorFields} />
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
                    initial={{ opacity: 0, x: -400, scale: 0.5 }}
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
        <div className="flex gap-4 mt-12">
          <button
            type="submit"
            className={styles.saveButton}
            disabled={
              isImageSubmitting ||
              !blocks.length ||
              isLoading ||
              blocks.filter((block) => block.type === "image").length > 10
            }
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
