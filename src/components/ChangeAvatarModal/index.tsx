import React from "react";
import styles from "./ChangeAvatarModal.module.scss";
import axios from "axios";
import { useSession } from "next-auth/react";
import { PenIcon } from "@/ui/PenIcon";

interface AvatarModalProps {
  handleChangeAvatar: (avatarUrl: string) => void;
}

export const ChangeAvatarModal: React.FC<AvatarModalProps> = ({
  handleChangeAvatar,
}) => {
  const [attachedImageFormData, setAttachedImageFormData] = React.useState([]);
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
      console.warn(err);

      alert("Ошибка при загрузке файла");
    }
  };

  const onSubmitAttachedImage = async () => {
    try {
      setIsUploading(true);

      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/virtuux/image/upload",
        attachedImageFormData
      );

      handleChangeAvatar(data.secure_url);

      await update({
        avatarUrl: data.secure_url,
      });

      await axios.patch("/api/upload-avatar", { avatarUrl: data.secure_url });

      setIsUploading(false);

      return data;
    } catch (err) {
      console.warn(err);

      alert("Update image error");
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
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => setIsChangeAvatarOpen(false)}
            >
              Закрыть
            </button>
            <div className="flex flex-col items-center">
              {preview && (
                <div>
                  <img
                    className={styles.preview}
                    src={preview}
                    alt="image preview"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={onSubmitAttachedImage}
                className={styles.submitButton}
                disabled={isUploading || !preview}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
