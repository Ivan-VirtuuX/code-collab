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
import { AnimatePresence, motion } from "framer-motion";
import { ILike } from "@/types/Like";
import { useSession } from "next-auth/react";

interface CommentItemProps extends IComment {
  isCommentLiked: boolean;
  user?: IUser;
  isReply: boolean;
  handleClickReply: (comment: Pick<IComment, "author" | "text" | "id">) => void;
  collabId?: string;
  replyComment?: any;
  commentId?: string;
  handleDelete?: (id: string) => void;
  handleDeleteReply?: (id: string) => void;
  canDelete?: boolean;
  setCollabComments?: React.Dispatch<React.SetStateAction<IComment[]>>;
  collabComments?: IComment[];
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
  handleDeleteReply,
  canDelete = true,
  setCollabComments,
  collabComments,
}) => {
  const [isLiked, setIsLiked] = React.useState(isCommentLiked);
  const [likesCount, setLikesCount] = React.useState(likes?.length || 0);
  const [commentReplies, setCommentReplies] = React.useState<ICommentReply[]>(
    []
  );
  const [commentLikes, setCommentLikes] = React.useState<ILike[]>(likes);
  const [contextMenu, setContextMenu] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const { data: session, update } = useSession();

  const userRatingPoints = session?.user?.ratingPoints || 0;

  const handleContextMenu = (e: React.MouseEvent) => {
    if (canDelete && author.id === user?.id) {
      e.preventDefault();
      setContextMenu({ x: e.pageX, y: e.pageY });
    }
  };

  const onClickDeleteComment = async () => {
    try {
      setContextMenu(null);

      if (isReply) {
        if (handleDeleteReply) handleDeleteReply(id);
        await Api().user.deleteCommentReply(collabId, id, user?.login);
      } else {
        if (handleDelete) handleDelete(id);
        await Api().user.deleteComment(collabId, id, user?.login);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onClickLike = async (likeId?: string) => {
    try {
      if (isLiked) {
        setIsSubmitting(true);

        setIsLiked(false);
        setLikesCount(likesCount - 1);

        await Api().collab.removeCommentLike(id, isReply, likeId, collabId, id);

        setCommentLikes([...commentLikes.filter((like) => like.id !== likeId)]);
      } else {
        setIsSubmitting(true);

        setIsLiked(true);
        setLikesCount(likesCount + 1);

        const like = await Api().collab.addCommentLike(
          id,
          isReply,
          author?.id,
          collabId,
          commentId
        );
        setCommentLikes([...commentLikes, { id: like.id, author }]);

        await update({ ...session, ratingPoints: userRatingPoints + 2 });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    setCommentReplies(replies);
  }, [replies]);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        className={styles.container}
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 200, scale: 1.2 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div onContextMenu={handleContextMenu} ref={containerRef}>
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
                  isSubmitting={isSubmitting}
                  isAuth={!!user}
                  isLiked={isLiked}
                  handleClick={onClickLike}
                  likesCount={likesCount}
                  likeId={
                    commentLikes?.find((like) => like?.author?.id === user?.id)
                      ?.id
                  }
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
              setCollabComments={
                setCollabComments as React.Dispatch<
                  React.SetStateAction<IComment[]>
                >
              }
              collabComments={collabComments as IComment[]}
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
      </motion.div>
    </AnimatePresence>
  );
};
