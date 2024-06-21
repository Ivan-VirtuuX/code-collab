import React from "react";

import Link from "next/link";

import styles from "./CollabTags.module.scss";

interface CollabTagsProps {
  tags: string[];
}

export const CollabTags: React.FC<CollabTagsProps> = ({ tags }) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {tags?.map((tag) => (
        <Link href={`/tags/${tag}`} key={tag} className={styles.tag}>
          <span>{tag}</span>
        </Link>
      ))}
    </div>
  );
};
