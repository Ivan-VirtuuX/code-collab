import { IComment } from "@/types/Comment";
import { IUser } from "@/types/User";
import { IStack } from "@/types/Stack";

export interface ICollab {
  id: string;
  author: IUser;
  comments: IComment[];
  stack: IStack[];
  title: string;
  body: string;
  viewsCount: number;
  tags: string[];
  createdAt: Date;
}
