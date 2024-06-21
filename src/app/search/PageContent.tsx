"use client";

import React, { useState } from "react";

import { IUser } from "@/types/User";
import { ICollab } from "@/types/Collab";

import { Api } from "@/api";

import { CollabsList } from "@/components/CollabsList";
import { UserInfo } from "@/components/UserInfo";

import styles from "./Search.module.scss";

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

  React.useEffect(() => {
    handleSearch();
  }, [searchType]);

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
              searchType === "user"
                ? "пользователей"
                : "коллаб по тегу #запрос или тексту"
            }`}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSearch();
              }
            }}
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
      <div className="mt-10 pb-5">
        {results?.users?.length !== 0 || results?.collabs?.length !== 0 ? (
          searchType === "user" ? (
            <div className="flex flex-col gap-5">
              {results.users.map((user) => (
                <UserInfo key={user.id} {...user} />
              ))}
            </div>
          ) : (
            <CollabsList collabs={results.collabs} />
          )
        ) : (
          <div>
            <p className={styles.noResultsText}>
              По данному запросу ничего не найдено
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
