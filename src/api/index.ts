import { GetServerSidePropsContext, NextPageContext } from "next";

import axios from "axios";
import { UserApi } from "@/api/user";
import { CollabApi } from "@/api/collab";

export type ApiReturnType = {
  user: ReturnType<typeof UserApi>;
  collab: ReturnType<typeof CollabApi>;
};

export const Api = (
  ctx?: NextPageContext | GetServerSidePropsContext
): ApiReturnType => {
  const instance = axios.create({
    baseURL: "https://code-collab-six.vercel.app/api",
  });

  const apis = {
    user: UserApi,
    collab: CollabApi,
  };

  return Object.entries(apis).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(instance),
    };
  }, {} as ApiReturnType);
};
