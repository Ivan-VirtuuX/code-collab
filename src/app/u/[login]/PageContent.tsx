"use client";

import React from "react";

import { CollabsList } from "@/components/CollabsList";

import { ICollab } from "@/types/Collab";
import { IUser } from "@/types/User";

interface PageContentProps {
  initialCollabs: ICollab[];
  authUser?: IUser;
}
export const PageContent: React.FC<PageContentProps> = ({
  initialCollabs,
  authUser,
}) => {
  const [collabs, setCollabs] = React.useState<ICollab[]>(initialCollabs);

  return (
    <CollabsList
      collabs={collabs}
      setCollabs={setCollabs}
      authUser={authUser}
    />
  );
};
