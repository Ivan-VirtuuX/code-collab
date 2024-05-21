import React from "react";
import { getStackIcon } from "@/helpers/getStackIcon";

import styles from "./CollabStack.module.scss";

interface CollabStackProps {
  stack: string[];
}

export const CollabStack: React.FC<CollabStackProps> = ({ stack }) => {
  return (
    <div className="flex gap-4">
      {stack?.map((item) => (
        <div key={item} className={styles.stackItem}>
          <img src={getStackIcon(item)} alt="stack icon" />
        </div>
      ))}
    </div>
  );
};
