import React from "react";
import { CommentItem } from "@/components/CommentItem";
import { ICommentReply } from "@/types/CommentReply";
import { IUser } from "@/types/User";

import styles from "./CommentReplies.module.scss";
import { IComment } from "@/types/Comment";

interface CommentRepliesProps {
  replies: ICommentReply[];
  user?: IUser;
  handleClickReply: (
    comment: Pick<ICommentReply, "author" | "text" | "id">
  ) => void;
  initialVisibleReplies: number;
  setCollabComments: React.Dispatch<React.SetStateAction<IComment[]>>;
  collabComments: IComment[];
}

export const CommentReplies: React.FC<CommentRepliesProps> = ({
  replies,
  user,
  handleClickReply,
  initialVisibleReplies,
  setCollabComments,
  collabComments,
}) => {
  const [visibleRepliesCount, setVisibleRepliesCount] = React.useState(
    initialVisibleReplies
  );
  const showMoreReplies = () =>
    setVisibleRepliesCount((prevCount) => prevCount + 5);
  const visibleReplies = replies?.slice(0, visibleRepliesCount);

  return (
    <div className="ml-14">
      {visibleReplies?.map((reply) => (
        <CommentItem
          handleClickReply={(comment) => handleClickReply(comment)}
          key={reply.id}
          isReply
          user={user}
          {...reply}
          collabId={reply.collabId}
          isCommentLiked={reply.likes.some(
            (like) => like.author.id === user?.id
          )}
          handleDeleteReply={(replyId) =>
            setCollabComments([
              ...collabComments.map((comment) => ({
                ...comment,
                replies: comment.replies.filter(
                  (reply) => reply.id !== replyId
                ),
              })),
            ])
          }
        />
      ))}
      {replies?.length > visibleRepliesCount && (
        <button onClick={showMoreReplies} className={styles.showMoreButton}>
          Показать больше...
        </button>
      )}
    </div>
  );
};
