"use client";

import React from "react";

import Link from "next/link";

import { EyeIcon } from "@/ui/EyeIcon";
import { ReplyIcon } from "@/ui/ReplyIcon";

import { CreatedAtBlock } from "@/components/CreatedAtBlock";
import { CollabStack } from "@/components/CollabStack";
import { CollabTags } from "@/components/CollabTags";
import { UserInfo } from "@/components/UserInfo";
import ContextMenu from "@/components/ContextMenu";

import { OutputBlockData } from "@editorjs/editorjs";

import { Api } from "@/api";

import { ICollab } from "@/types/Collab";
import { IUser } from "@/types/User";

import styles from "./CollabsListItem.module.scss";

interface CollabItemProps extends ICollab {
  handleDelete?: (id: string) => void;
  isCollabPage?: boolean;
  authUser?: IUser;
}

export const CollabsListItem: React.FC<CollabItemProps> = ({
  id,
  title,
  createdAt,
  comments,
  stack,
  tags,
  author,
  viewsCount,
  body,
  handleDelete,
  isCollabPage = false,
  authUser,
}) => {
  const [contextMenu, setContextMenu] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    if (!isCollabPage && author.id === authUser?.id) {
      e.preventDefault();
      setContextMenu({ x: e.pageX, y: e.pageY });
    }
  };

  const onClickDeleteCollab = async () => {
    try {
      if (handleDelete) handleDelete(id);

      setContextMenu(null);

      await Api().collab.delete(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={styles.container}
      onContextMenu={handleContextMenu}
      ref={containerRef}
    >
      <div className="flex justify-between items-start flex-wrap gap-2">
        <UserInfo {...author} />
        <div className="flex items-center gap-4">
          <CreatedAtBlock createdAt={createdAt} />
          <div className="flex items-center">
            <EyeIcon />
            <span className={styles.topText}>{viewsCount}</span>
          </div>
        </div>
      </div>
      {isCollabPage ? (
        <p className={styles.collabPageTitle}>{title}</p>
      ) : (
        <Link href={`/collabs/${id}`}>
          <p className={styles.title}>{title}</p>
        </Link>
      )}
      <div style={{ marginBottom: 10 }} className="flex flex-col gap-2">
        {body?.map((obj: OutputBlockData["data"]) => (
          <p key={obj?.id} className={styles.text}>
            {obj.data.text}
          </p>
        ))}
        {body?.some((obj: OutputBlockData["data"]) => obj.type === "image") && (
          <div
            className={styles.imagesBlock}
            style={{
              gridTemplateColumns:
                body.filter(
                  (obj: OutputBlockData["data"]) => obj.type === "image"
                ).length >= 2
                  ? "1fr 1fr"
                  : "1fr",
            }}
          >
            {body.map(
              (obj: OutputBlockData["data"]) =>
                obj?.data?.file?.url && (
                  <img
                    key={obj?.id}
                    className={styles.image}
                    src={obj.data.file.url}
                    alt="post image"
                  />
                )
            )}
          </div>
        )}
      </div>
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
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onClickDelete={onClickDeleteCollab}
        />
      )}
    </div>
  );
};
