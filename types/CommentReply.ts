import { IUser } from "@/types/User";
import { ICollab } from "@/types/Collab";
import { ILike } from "@/types/Like";

export interface ICommentReply {
  id: string;
  author: IUser;
  text: string;
  collab: ICollab;
  likes: ILike[];
  replies: ICommentReply[];
  collabId: string;
  commentId: string;
  createdAt: Date;
}
