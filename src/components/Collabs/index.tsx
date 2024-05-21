import { CollabsListItem } from "@/components/CollabsListItem";

export const CollabsList = ({ collabs }: { collabs: any[] }) => {
  console.log(collabs);

  return (
    <>
      {collabs.length !== 0 &&
        collabs.map((collab) => (
          <CollabsListItem key={collab.id} {...collab} />
        ))}
    </>
  );
};
