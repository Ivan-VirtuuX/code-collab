"use client";

import React from "react";

import { useSession } from "next-auth/react";

import styles from "@/app/collabs/[id]/Collab.module.scss";

import { CommentItem } from "@/components/CommentItem";

import { IUser } from "@/types/User";
import { IComment } from "@/types/Comment";
import { ICollab } from "@/types/Collab";

import { SendIcon } from "@/ui/SendIcon";

import { Api } from "@/api";

interface CollabPageContentProps {
  initialComments: IComment[];
  user?: IUser;
  collab: ICollab;
  initialTotalComments: number;
}

export const CollabPageContent: React.FC<CollabPageContentProps> = ({
  initialComments,
  user,
  collab,
  initialTotalComments,
}) => {
  const [commentText, setCommentText] = React.useState("");
  const [collabComments, setCollabComments] =
    React.useState<IComment[]>(initialComments);
  const [visibleCommentsCount, setVisibleCommentsCount] = React.useState(
    initialComments.length
  );
  const [totalComments, setTotalComments] =
    React.useState(initialTotalComments);
  const [page, setPage] = React.useState(1);
  const [replyComment, setReplyComment] =
    React.useState<Pick<IComment, "author" | "text" | "id">>();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const { data: session, update } = useSession();

  const userRatingPoints = session?.user?.ratingPoints || 0;

  const limit = 5;

  const isAuth = !!user;

  const fetchMoreComments = async () => {
    const newPage = page + 1;

    const newComments = await Api().collab.getManyCommentsByPage(
      collab.id,
      limit,
      newPage
    );

    setCollabComments((prevComments) => [...prevComments, ...newComments]);
    setPage(newPage);
    setVisibleCommentsCount(visibleCommentsCount + newComments.length);
  };

  const onSendComment = async () => {
    if (replyComment) {
      const reply = await Api().collab.addReply(
        collab.id,
        replyComment.id,
        commentText
      );

      setCollabComments((prevComments) =>
        prevComments.map((comment) =>
          replyComment && comment.id === replyComment.id
            ? {
                ...comment,
                replies: [...comment.replies, reply],
              }
            : comment
        )
      );

      await update({ ...session, ratingPoints: userRatingPoints + 5 });
    } else {
      const newComment = await Api().collab.addComment(collab.id, commentText);

      setCollabComments([...collabComments, newComment]);
      setVisibleCommentsCount(visibleCommentsCount + 1);

      await update({ ...session, ratingPoints: userRatingPoints + 5 });
    }

    setReplyComment(undefined);
    setCommentText("");
    setTotalComments(totalComments + 1);
  };

  return (
    <div className={styles.commentsBlock}>
      <div>
        {collabComments?.map((comment) => (
          <CommentItem
            isReply={false}
            user={user}
            key={comment.id}
            {...comment}
            isCommentLiked={comment?.likes?.some(
              (like) => like.author.id === user?.id
            )}
            handleClickReply={(comment) => {
              setReplyComment(comment);
              inputRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            handleDelete={(commentId) =>
              setCollabComments([
                ...collabComments.filter((comment) => comment.id !== commentId),
              ])
            }
            setCollabComments={setCollabComments}
            collabComments={collabComments}
          />
        ))}
        {collabComments.length === 0 && (
          <div>
            <p className={styles.noCommentsTitle}>Список пуст</p>
            {isAuth && (
              <p className={styles.noCommentsText}>
                Оставьте комментарий первым
              </p>
            )}
          </div>
        )}
      </div>
      {visibleCommentsCount < totalComments && totalComments !== 1 && (
        <button className={styles.showMoreButton} onClick={fetchMoreComments}>
          Показать больше...
        </button>
      )}
      {isAuth && (
        <div className={`${styles.commentInputContainer} relative mt-7`}>
          {replyComment && (
            <span className={styles.replyUserLogin}>
              @{replyComment.author.login}
            </span>
          )}
          <input
            ref={inputRef}
            style={{
              paddingLeft: replyComment
                ? replyComment.author.login.length * 12
                : 16,
            }}
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
            type="text"
            placeholder="Текст комментария..."
            className={styles.commentInput}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSendComment();
              }
            }}
          />
          <button
            className={`${styles.sendCommentButton} flex gap-1`}
            disabled={!commentText}
            onClick={onSendComment}
          >
            <span>Отправить</span>
            <SendIcon />
          </button>
        </div>
      )}
    </div>
  );
};
