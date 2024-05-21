import React from "react";

import styles from "./PageTitle.module.scss";

interface PageTitleProps {
  title: string;
  children: React.ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, children }) => {
  return (
    <div className={`${styles.container} flex items-center gap-5`}>
      {children}
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};
