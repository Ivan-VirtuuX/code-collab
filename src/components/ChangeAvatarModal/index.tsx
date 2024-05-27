import React from "react";
import styles from "./ChangeAvatarModal.module.scss";
import { useSession } from "next-auth/react";
import { PenIcon } from "@/ui/PenIcon";
import { AnimatePresence, motion } from "framer-motion";
import { Api } from "@/api";

interface AvatarModalProps {
  handleChangeAvatar: (avatarUrl: string) => void;
}

export const ChangeAvatarModal: React.FC<AvatarModalProps> = ({
  handleChangeAvatar,
}) => {
  const [attachedImageFormData, setAttachedImageFormData] = React.useState<
    FormData[]
  >([]);
  const [isChangeAvatarOpen, setIsChangeAvatarOpen] = React.useState(false);
  const [attachedImage, setAttachedImage] = React.useState<File>();
  const [isSaveImage, setIsSaveImage] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [preview, setPreview] = React.useState("");

  const attachedImageRef = React.useRef<HTMLInputElement>(null);

  const { data: session, status, update } = useSession();

  const onCloseImage = async () => {
    await setAttachedImageFormData([]);
    await setAttachedImageFormData([]);
    await setAttachedImage(undefined);
    await setIsSaveImage(false);
    await setPreview("");
    await setIsChangeAvatarOpen(false);
  };

  const handleChangeImage = async (files: FileList | null) => {
    try {
      if (!files) return;

      const formData: any = new FormData();

      formData.append("file", files[0]);
      formData.append("upload_preset", "cqxjdiz4");

      setAttachedImageFormData(formData);

      setAttachedImage(files[0]);

      files && setIsSaveImage(true);
    } catch (err) {
      console.error(err);

      alert("Ошибка при загрузке файла");
    }
  };

  const onSaveAvatar = async () => {
    try {
      setIsUploading(true);

      const avatarUrl = await Api().user.updateAvatar(attachedImageFormData);

      handleChangeAvatar(avatarUrl);

      await update({
        avatarUrl,
      });
    } catch (err) {
      console.error(err);

      alert("Ошибка при загрузке аватара");
    } finally {
      setIsSaveImage(false);
      setIsUploading(false);
      setIsChangeAvatarOpen(false);
    }
  };

  React.useEffect(() => {
    if (isSaveImage) setIsChangeAvatarOpen(true);
  }, [attachedImage]);

  React.useEffect(() => {
    if (attachedImage) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result as string);
      };

      reader.readAsDataURL(attachedImage);
    } else {
      setPreview("");
    }
  }, [attachedImage]);

  return (
    <>
      <button
        type="button"
        className={styles.editAvatarButton}
        onClick={() => attachedImageRef?.current?.click()}
      >
        <PenIcon />
      </button>
      <input
        accept="image/*"
        ref={attachedImageRef}
        type="file"
        onChange={(e) => handleChangeImage(e.target.files)}
        hidden
      />

      {isChangeAvatarOpen && (
        <div className={styles.modalOverlay}>
          <AnimatePresence>
            <motion.div
              className={styles.error}
              layout
              initial={{ opacity: 0, x: -400, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 200, scale: 1.2 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <div className={styles.modalContent}>
                <button
                  className={styles.closeButton}
                  onClick={() => setIsChangeAvatarOpen(false)}
                >
                  Закрыть
                </button>
                <div className="flex flex-col items-center justify-center">
                  {preview && (
                    <img
                      className={styles.preview}
                      src={preview}
                      alt="image preview"
                    />
                  )}
                  <button
                    type="button"
                    onClick={onSaveAvatar}
                    className={styles.submitButton}
                    disabled={isUploading || !preview}
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
};
