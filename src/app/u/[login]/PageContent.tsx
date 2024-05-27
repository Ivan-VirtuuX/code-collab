"use client";

import { CollabsList } from "@/components/CollabsList";
import React from "react";
import { ICollab } from "@/types/Collab";

export const PageContent = ({
  initialCollabs,
}: {
  initialCollabs: ICollab[];
}) => {
  const [collabs, setCollabs] = React.useState<ICollab[]>(initialCollabs);

  return <CollabsList collabs={collabs} setCollabs={setCollabs} />;
};
