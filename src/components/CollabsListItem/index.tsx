import React from "react";
import { ICollab } from "@/types/Collab";
import { TimeIcon } from "@/ui/TimeIcon";
import { formatDate } from "@/helpers/formatDate";

import styles from "./CollabsListItem.module.scss";
import { UserInfo } from "@/components/UserInfo";
import { EyeIcon } from "@/ui/EyeIcon";
import { CollabStack } from "@/components/CollabStack";
import { ReplyIcon } from "@/ui/ReplyIcon";
import { CollabTags } from "@/components/CollabTags";
import Link from "next/link";

interface CollabItemProps extends ICollab {}

export const CollabsListItem: React.FC<CollabItemProps> = ({
  id,
  title,
  createdAt,
  comments,
  stack,
  tags,
  author,
  viewsCount,
}) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.top} flex justify-between flex-wrap gap-2`}>
        <UserInfo {...author} />
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <TimeIcon />
            <span className={styles.topText}>{formatDate(createdAt)}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon />
            <span className={styles.topText}>{viewsCount}</span>
          </div>
        </div>
      </div>
      <Link href={`/collabs/${id}`}>
        <p className={styles.title}>{title}</p>
      </Link>
      <div className="flex justify-end">
        <CollabStack stack={stack} />
      </div>
      <div className="flex items-center justify-between flex-wrap-reverse gap-2 mt-4">
        <div className="flex items-center">
          <ReplyIcon />
          <span className={styles.repliesText}>
            Ответов: {comments?.length || 0}
          </span>
        </div>
        <CollabTags tags={tags} />
      </div>
    </div>
  );
};
