"use client";

import { PageTitle } from "@/components/PageTitle";
import { PeopleIcon } from "@/ui/PeopleIcon";
import styles from "@/app/collabs/CollabsPage.module.scss";
import { CollabsList } from "../../components/CollabsList";
import React from "react";
import { Api } from "@/api";
import { ICollab } from "@/types/Collab";
import { IUser } from "@/types/User";

export const CollabsPageContent: React.FC<{ authUser?: IUser }> = ({
  authUser,
}) => {
  const [collabs, setCollabs] = React.useState<ICollab[]>([]);
  const [filterType, setFilterType] = React.useState("all");

  React.useEffect(() => {
    (async () => {
      try {
        if (filterType === "all") {
          const data = await Api().collab.getAll();
          setCollabs(data);
        } else {
          const data = await Api().collab.getPopular();
          setCollabs(data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [filterType]);

  return (
    <>
      <div className="flex items-center justify-between mt-10 flex-wrap gap-2">
        <PageTitle title="Коллабы">
          <PeopleIcon />
        </PageTitle>
        <div className="flex gap-3">
          <button
            className={`${styles.filterButton} ${
              filterType === "all" && styles.activeFilterButton
            }`}
            onClick={() => setFilterType("all")}
          >
            Все
          </button>
          <button
            className={`${styles.filterButton} ${
              filterType === "popular" && styles.activeFilterButton
            }`}
            onClick={() => setFilterType("popular")}
          >
            Популярные
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-7 mt-12 my-10">
        <CollabsList
          collabs={collabs}
          setCollabs={setCollabs}
          authUser={authUser}
        />
      </div>
    </>
  );
};
