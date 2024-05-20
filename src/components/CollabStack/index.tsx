import React from "react";
import { IStack } from "@/types/Stack";
import { getStackIcon } from "@/helpers/getStackIcon";

import styles from "./CollabStack.module.scss";

interface CollabStackProps {
  stack: IStack[];
}

export const CollabStack: React.FC<CollabStackProps> = ({ stack }) => {
  return (
    <div className="flex gap-4">
      {stack.map((item) => (
        <div key={item.id} className={styles.stackItem}>
          <img src={getStackIcon(item.name)} alt="stack icon" />
        </div>
      ))}
    </div>
  );
};
