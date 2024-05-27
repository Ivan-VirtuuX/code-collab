import { TimeIcon } from "@/ui/TimeIcon";
import styles from "./CreatedAtBlock.module.scss";
import { formatDate } from "@/helpers/formatDate";
import React from "react";

export const CreatedAtBlock = ({ createdAt }: { createdAt: Date }) => {
  return (
    <div className="flex items-center">
      <TimeIcon />
      <span className={styles.text}>{formatDate(createdAt)}</span>
    </div>
  );
};
