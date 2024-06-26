import React from "react";

import { CollabsListItem } from "@/components/CollabsListItem";

import { ICollab } from "@/types/Collab";
import { IUser } from "@/types/User";

interface CollabsListProps {
  collabs: ICollab[];
  setCollabs?: React.Dispatch<React.SetStateAction<ICollab[]>>;
  authUser?: IUser;
}

export const CollabsList: React.FC<CollabsListProps> = ({
  collabs,
  setCollabs,
  authUser,
}) => {
  const handleDelete = async (id: string) => {
    if (setCollabs) setCollabs(collabs.filter((c) => c.id !== id));
  };

  return (
    <div className="flex flex-col gap-5">
      {collabs.length !== 0 &&
        collabs.map((collab) => (
          <CollabsListItem
            key={collab.id}
            {...collab}
            authUser={authUser}
            handleDelete={setCollabs && handleDelete}
          />
        ))}
    </div>
  );
};
