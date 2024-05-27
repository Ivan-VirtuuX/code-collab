import React from "react";
import { HeartIcon } from "@/ui/HeartIcon";

import styles from "./LikeButton.module.scss";
import { AnimatePresence, motion } from "framer-motion";

interface LikeButtonProps {
  likesCount: number;
  isLiked: boolean;
  handleClick: (likeId?: string) => void;
  likeId?: string;
  isAuth?: boolean;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  likesCount,
  isLiked,
  handleClick,
  likeId,
  isAuth,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.error}
        layout
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 200, scale: 1.2 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div
          className="flex items-center cursor-pointer"
          onClick={() => handleClick(likeId)}
          style={{ pointerEvents: isAuth ? "auto" : "none" }}
        >
          {isLiked ? (
            <HeartIcon color="#F31222" />
          ) : (
            <HeartIcon color="#2D3436" />
          )}
          <span
            className={styles.likesCount}
            style={{ color: isLiked ? "#F31222" : "#2D3436" }}
          >
            {likesCount}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
