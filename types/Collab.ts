import { IComment } from "@/types/Comment";
import { IUser } from "@/types/User";
import { OutputBlockData } from "@editorjs/editorjs";

export interface ICollab {
  id: string;
  author: IUser;
  comments: IComment[];
  stack: string[];
  title: string;
  body: OutputBlockData["data"];
  viewsCount: number;
  tags: string[];
  createdAt: Date;
}
