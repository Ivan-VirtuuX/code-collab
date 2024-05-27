import { IUser } from "@/types/User";
import { ICollab } from "@/types/Collab";

export interface IPointsHistory {
  id: string;
  collab: ICollab;
  author: IUser;
  eventType: string;
  points: number;
  createdAt: Date;
}
