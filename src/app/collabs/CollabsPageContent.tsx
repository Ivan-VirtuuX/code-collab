"use client";

import { PageTitle } from "@/components/PageTitle";
import { PeopleIcon } from "@/ui/PeopleIcon";
import styles from "@/app/collabs/CollabsPage.module.scss";
import { CollabsList } from "@/components/Collabs";
import axios from "axios";
import React from "react";

export const CollabsPageContent = () => {
  const [collabs, setCollabs] = React.useState([]);
  const [filterType, setFilterType] = React.useState("all");

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://code-collab-six.vercel.app/api/collab/${
            filterType === "all" ? "" : filterType
          }`
        );
        setCollabs(data);
      } catch (error) {
        console.error("Error fetching collabs:", error);
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
            className={styles.filterButton}
            onClick={() => setFilterType("all")}
          >
            Все
          </button>
          <button
            className={styles.filterButton}
            onClick={() => setFilterType("popular")}
          >
            Популярные
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-7 mt-12 my-10">
        <CollabsList collabs={collabs} />
      </div>
    </>
  );
};
