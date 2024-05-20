import React from "react";
import { stackIcons } from "@/helpers/getStackIcon";

import styles from "./StackModal.module.scss";
import { AnimatePresence, motion } from "framer-motion";

interface StackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedIcons: string[]) => void;
  icons: string[];
}

export const StackModal: React.FC<StackModalProps> = ({
  isOpen,
  onClose,
  onSave,
  icons,
}) => {
  const [selectedIcons, setSelectedIcons] = React.useState<string[]>([]);

  const handleIconClick = (iconName: string) => {
    if (selectedIcons.includes(iconName))
      setSelectedIcons(selectedIcons.filter((icon) => icon !== iconName));
    else if (selectedIcons.length < 5)
      setSelectedIcons([...selectedIcons, iconName]);
  };

  const handleSave = () => {
    onSave(selectedIcons);
    onClose();
  };

  React.useEffect(() => {
    setSelectedIcons(icons);
  }, [icons]);

  return (
    isOpen && (
      <div className={styles.modalOverlay}>
        <AnimatePresence>
          <motion.div
            layout
            initial={{ opacity: 0, x: -400, scale: 0.5 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 200, scale: 1.2 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2>Технологии</h2>
                <button onClick={onClose}>Закрыть</button>
              </div>
              <div className={styles.iconList}>
                {stackIcons.map(({ name, icon }) => (
                  <div
                    key={name}
                    onClick={() => handleIconClick(name)}
                    className={styles.iconContainer}
                    style={
                      selectedIcons.includes(name)
                        ? {
                            outline: "1px solid #007BFFFF",
                          }
                        : {}
                    }
                  >
                    <img
                      src={icon}
                      alt={name}
                      onClick={() => handleIconClick(name)}
                      className={styles.icon}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.modalFooter}>
                <button onClick={handleSave} className={styles.saveButton}>
                  Сохранить
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    )
  );
};
