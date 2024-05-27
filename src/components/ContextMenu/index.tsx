import React from "react";
import styles from "./ContextMenu.module.scss";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onClickDelete: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  onClose,
  onClickDelete,
}) => {
  const menuRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  const handleDelete = () => {
    onClickDelete();
    onClose();
  };

  return (
    <button
      className={styles.button}
      onClick={handleDelete}
      style={{ top: y, left: x }}
      ref={menuRef}
    >
      Удалить
    </button>
  );
};

export default ContextMenu;
