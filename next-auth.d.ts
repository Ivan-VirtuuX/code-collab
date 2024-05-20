import { DefaultSession } from "next-auth";
import { IUser } from "@/types/User";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: IUser;
  }
}
