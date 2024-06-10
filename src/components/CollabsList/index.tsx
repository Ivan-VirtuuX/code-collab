import { CollabsListItem } from "@/components/CollabsListItem";
import React from "react";
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
    <>
      {collabs.length !== 0 &&
        collabs.map((collab) => (
          <CollabsListItem
            key={collab.id}
            {...collab}
            authUser={authUser}
            handleDelete={setCollabs && handleDelete}
            canDelete
          />
        ))}
    </>
  );
};
