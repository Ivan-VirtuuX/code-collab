"use client";

import styles from "./Search.module.scss";
import React, { useState } from "react";
import { IUser } from "@/types/User"; // Предполагается, что у вас есть тип IUser
import { ICollab } from "@/types/Collab";
import { CollabsList } from "@/components/CollabsList";
import { Api } from "@/api"; // Предполагается, что у вас есть тип ICollab

export const PageContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"user" | "collab">("user");
  const [results, setResults] = useState<{
    collabs: ICollab[];
    users: IUser[];
  }>({ collabs: [], users: [] });

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      if (searchType === "user") {
        const users = await Api().user.search(searchQuery);
        setResults({ users, collabs: [] });
      } else {
        const collabs = await Api().collab.search(searchQuery);
        setResults({ users: [], collabs });
      }
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className={`${styles.top} flex gap-6`}>
          <input
            type="text"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Поиск ${
              searchType === "user" ? "пользователей" : "коллаб"
            }`}
          />
          <button
            className={styles.searchButton}
            onClick={handleSearch}
            disabled={!searchQuery}
          >
            Найти
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className={`${styles.changeSearchTypeButton} ${
              searchType === "user" ? styles.changeSearchTypeButtonActive : ""
            }`}
            onClick={() => setSearchType("user")}
          >
            Пользователь
          </button>
          <button
            className={`${styles.changeSearchTypeButton} ${
              searchType === "collab" ? styles.changeSearchTypeButtonActive : ""
            }`}
            onClick={() => setSearchType("collab")}
          >
            Коллаб
          </button>
        </div>
      </div>
      <div className={`${styles.results} mt-10`}>
        {results?.users?.length !== 0 || results?.collabs?.length !== 0 ? (
          searchType === "user" ? (
            results.users.map((user) => (
              <div key={user.id} className={styles.resultItem}>
                {user.login}
              </div>
            ))
          ) : (
            <CollabsList collabs={results.collabs} />
          )
        ) : (
          <p>Ничего не найдено</p>
        )}
      </div>
    </div>
  );
};
