import { IUser } from "@/types/User";
import { ILike } from "@/types/Like";
import { ICollab } from "@/types/Collab";
import { ICommentReply } from "@/types/CommentReply";

export interface IComment {
  id: string;
  author: IUser;
  text: string;
  collab: ICollab;
  likes: ILike[];
  replies: ICommentReply[];
  createdAt: Date;
}
