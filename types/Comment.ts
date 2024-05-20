import { IUser } from "@/types/User";
import { ILike } from "@/types/Like";

export interface IComment {
  id: string;
  author: IUser;
  likes: ILike[];
  createdAt: Date;
}
