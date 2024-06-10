"use client";

import styles from "./CollabEditor.module.scss";
import React from "react";
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import { CloudinaryApi, cloudinaryBaseURL } from "@/api/CloudinaryApi";

interface EditorProps {
  onChange: (arr: OutputBlockData[]) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setEditorError: React.Dispatch<React.SetStateAction<string>>;
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  setIsLoading,
  setEditorError,
}) => {
  const ref = React.useRef<EditorJS>();

  React.useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        data: {
          blocks: [],
        },
        placeholder: "Текст коллаба...",
        async onChange() {
          const { blocks } = await editor.save();

          onChange(blocks);

          const paragraphCount = blocks.filter(
            (block) => block.type === "paragraph"
          ).length;
          if (paragraphCount >= 10) {
            setEditorError("Вы не можете добавить больше 10 блоков");
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else setEditorError("");
        },
        tools: {
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: cloudinaryBaseURL,
              },
              field: "file",
              additionalRequestData: { upload_preset: "cqxjdiz4" },
              captionPlaceholder: "none",
              uploader: {
                async uploadByFile(file: File) {
                  setIsLoading(true);

                  try {
                    const formData: any = new FormData();

                    formData.append("file", file);
                    formData.append("upload_preset", "cqxjdiz4");

                    const data = await CloudinaryApi().images.add(formData);

                    return {
                      success: 1,
                      file: {
                        url: data.secure_url,
                      },
                    };
                  } catch (err) {
                    console.warn(err);
                  } finally {
                    setIsLoading(false);
                  }
                },
              },
              buttonContent: "Загрузить картинку",
            },
          },
        },
      });
      ref.current = editor;
    }
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      const editor = document.getElementById("editor");

      if (editor) editor.style.pointerEvents = "auto";
    }, 1000);
  }, []);

  return <div id="editor" className={styles.editor} />;
};

export default React.memo(Editor);
