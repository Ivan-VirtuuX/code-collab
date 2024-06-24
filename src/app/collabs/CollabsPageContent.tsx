"use client";

import React from "react";

import { PageTitle } from "@/components/PageTitle";
import { CollabsList } from "@/components/CollabsList";

import { PeopleIcon } from "@/ui/PeopleIcon";

import styles from "@/app/collabs/CollabsPage.module.scss";

import { Api } from "@/api";

import { ICollab } from "@/types/Collab";
import { IUser } from "@/types/User";
import { Skeleton, Stack } from "@mui/material";

export const CollabsPageContent: React.FC<{ authUser?: IUser }> = ({
  authUser,
}) => {
  const [collabs, setCollabs] = React.useState<ICollab[]>([]);
  const [filterType, setFilterType] = React.useState("all");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        if (filterType === "all") {
          setIsLoading(true);

          const data = await Api().collab.getAll();
          setCollabs(data);

          setIsLoading(false);
        } else {
          setIsLoading(true);

          const data = await Api().collab.getPopular();
          setCollabs(data);

          setIsLoading(false);
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
        {isLoading ? (
          Array.from({ length: 3 }).map((_: any, index: number) => (
            <Stack
              key={index}
              spacing={1}
              style={{
                outline: "0.5px solid #bdc3c7",
                borderRadius: "15px",
                background: "#fff",
                padding: "20px",
              }}
            >
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div className="flex gap-3">
                  <Skeleton variant="circular" width={50} height={50} />
                  <div className="flex flex-col">
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "15px" }}
                      width={80}
                      height={20}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "12px" }}
                      width={60}
                      height={14}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "12px" }}
                      width={70}
                      height={14}
                    />
                  </div>
                </div>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Skeleton variant="circular" width={20} height={20} />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "15px" }}
                      width={160}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton variant="circular" width={20} height={20} />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "15px" }}
                      width={40}
                    />
                  </div>
                </div>
              </div>
              <Skeleton
                style={{ margin: "20px 0" }}
                variant="text"
                sx={{ fontSize: "25px" }}
              />
              <div className="flex justify-end gap-4">
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
              </div>
              <div
                className="flex items-center justify-between flex-wrap-reverse gap-2 mt-4"
                style={{ marginTop: "16px" }}
              >
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "15px" }}
                  width={100}
                />
                <div className="flex gap-4 flex-wrap">
                  <Skeleton
                    variant="rounded"
                    style={{ borderRadius: "50px" }}
                    width={75}
                    height={24}
                  />
                  <Skeleton
                    variant="rounded"
                    style={{ borderRadius: "50px" }}
                    width={75}
                    height={24}
                  />
                  <Skeleton
                    variant="rounded"
                    style={{ borderRadius: "50px" }}
                    width={75}
                    height={24}
                  />
                </div>
              </div>
            </Stack>
          ))
        ) : collabs.length !== 0 ? (
          <CollabsList
            collabs={collabs}
            setCollabs={setCollabs}
            authUser={authUser}
          />
        ) : (
          <p className={styles.noCollabsText}>Список коллаб пуст</p>
        )}
      </div>
    </>
  );
};
