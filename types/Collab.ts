import { IComment } from "@/types/Comment";
import { IUser } from "@/types/User";

export interface ICollab {
  id: string;
  author: IUser;
  comments: IComment[];
  stack: string[];
  title: string;
  body: string;
  viewsCount: number;
  tags: string[];
  createdAt: Date;
}
