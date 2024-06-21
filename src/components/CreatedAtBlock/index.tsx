import React from "react";

import { TimeIcon } from "@/ui/TimeIcon";

import { formatDate } from "@/helpers/formatDate";

import styles from "./CreatedAtBlock.module.scss";

export const CreatedAtBlock = ({ createdAt }: { createdAt: Date }) => {
  return (
    <div className="flex items-center">
      <TimeIcon />
      <span className={styles.text}>{formatDate(createdAt)}</span>
    </div>
  );
};
