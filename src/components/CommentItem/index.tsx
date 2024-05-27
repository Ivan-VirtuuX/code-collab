"use client";

import { UserInfo } from "@/components/UserInfo";
import React from "react";
import { IComment } from "@/types/Comment";

import styles from "./CommentItem.module.scss";
import { CreatedAtBlock } from "@/components/CreatedAtBlock";
import { ReplyIcon } from "@/ui/ReplyIcon";
import { LikeButton } from "../LikeButton";
import { CommentReplies } from "@/components/CommentReplies";
import { IUser } from "@/types/User";
import { ICommentReply } from "@/types/CommentReply";
import { Api } from "@/api";
import ContextMenu from "@/components/ContextMenu";

interface CommentItemProps extends IComment {
  isCommentLiked: boolean;
  user?: IUser;
  isReply: boolean;
  handleClickReply: (comment: Pick<IComment, "author" | "text" | "id">) => void;
  collabId?: string;
  replyComment?: any;
  commentId?: string;
  handleDelete?: (id: string) => void;
  canDelete?: boolean;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  id,
  author,
  likes,
  text,
  replies,
  createdAt,
  isCommentLiked,
  user,
  isReply,
  handleClickReply,
  collabId,
  commentId,
  handleDelete,
  canDelete = true,
}) => {
  const [isLiked, setIsLiked] = React.useState(isCommentLiked);
  const [likesCount, setLikesCount] = React.useState(likes?.length || 0);
  const [commentReplies, setCommentReplies] = React.useState<ICommentReply[]>(
    []
  );
  const [contextMenu, setContextMenu] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    if (canDelete && author.id === user?.id) {
      e.preventDefault();
      setContextMenu({ x: e.pageX, y: e.pageY });
    }
  };

  const onClickDeleteComment = async () => {
    try {
      if (handleDelete) handleDelete(id);

      setContextMenu(null);

      await Api().user.deleteComment(collabId, id, user?.login);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickLike = async (likeId?: string) => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount(likesCount - 1);

      await Api().collab.removeCommentLike(
        id,
        isReply,
        likeId,
        collabId,
        commentId
      );
    } else {
      setIsLiked(true);
      setLikesCount(likesCount + 1);

      await Api().collab.addCommentLike(
        id,
        isReply,
        author?.id,
        collabId,
        commentId
      );
    }
  };

  React.useEffect(() => {
    setCommentReplies(replies);
  }, [replies]);

  return (
    <div
      className={styles.container}
      onContextMenu={handleContextMenu}
      ref={containerRef}
    >
      <div>
        <div
          className={`${styles.top} flex flex-wrap-reverse justify-between gap-2`}
        >
          <UserInfo {...author} />
          <div>
            <CreatedAtBlock createdAt={createdAt} />
          </div>
        </div>
        <p className={styles.text}>{text}</p>
        <div
          className={`flex items-center ${
            isReply ? "justify-end" : "justify-between"
          } `}
        >
          {!isReply && (
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <ReplyIcon />
                <span className={styles.repliesText}>
                  Ответов: {commentReplies?.length || 0}
                </span>
              </div>
            </div>
          )}
          <div className="flex items-center gap-4">
            {!isReply && !!user && user?.id !== author?.id && (
              <button
                className={styles.replyButton}
                onClick={() => handleClickReply({ author, text, id })}
              >
                Ответить
              </button>
            )}
            <LikeButton
              isAuth={!!user}
              isLiked={isLiked}
              handleClick={onClickLike}
              likesCount={likesCount}
              likeId={likes?.find((like) => like?.author?.id === user?.id)?.id}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 mb-4">
        <CommentReplies
          replies={commentReplies}
          user={user}
          handleClickReply={(comment) => handleClickReply(comment)}
          initialVisibleReplies={2}
        />
      </div>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onClickDelete={onClickDeleteComment}
        />
      )}
    </div>
  );
};
