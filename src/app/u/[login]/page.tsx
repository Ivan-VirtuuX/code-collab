import React from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";

import { PageTitle } from "@/components/PageTitle";

import { DefaultAvatar } from "@/ui/DefaultAvatar";
import { FoldersIcon } from "@/ui/FoldersIcon";
import { CreateIcon } from "@/ui/CreateIcon";
import { RatingIcon } from "@/ui/RatingIcon";
import { GitHubIcon } from "@/ui/GitHubIcon";

import authOptions from "@/app/utils/auth";

import { Api } from "@/api";

import { formatRatingPoints } from "@/helpers/formatRatingPoints";
import { formatDate } from "@/helpers/formatDate";
import { getRank } from "@/helpers/getRank";

import { PageContent } from "./PageContent";

import styles from "./User.module.scss";

const getData = async (login: string) => {
  const collabs = await Api().user.getCollabs(login);
  const user = await Api().user.getOne(login);

  return { collabs, user };
};

interface MetadataProps {
  params: { id: string; login: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  return {
    title: params.login,
    icons: {
      icon: "/favicons/user-page.svg",
    },
  };
}

const User = async ({ params }: { params: { login: string } }) => {
  const session = await getServerSession(authOptions);

  const { user, collabs } = await getData(params.login);

  const userRank = {
    name: getRank(user?.ratingPoints || 0).name,
    color: getRank(user?.ratingPoints || 0).color,
  };

  const isOwner = session?.user.id === user?.id;

  return (
    <main className="container">
      <div className={`${styles.profileInfo} flex flex-col gap-5`}>
        <div
          className={`${styles.profileInfoTop} flex justify-between flex-wrap gap-5`}
        >
          <div className="flex flex-wrap justify-center gap-5">
            <div className={styles.avatar}>
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="user avatar"
                  className={styles.avatar}
                />
              ) : (
                <DefaultAvatar />
              )}
            </div>
            <div className="flex flex-col justify-between">
              <span className={styles.login}>{user?.login}</span>
              <div className={`${styles.createdAtBlock} flex flex-col`}>
                <span className={styles.createdAtBlockTitle}>
                  Зарегистрирован
                </span>
                <span className={styles.createdAtBlockText}>
                  {formatDate(user?.createdAt, "short")}
                </span>
              </div>
            </div>
          </div>
          <Link
            href="/rank"
            style={{ pointerEvents: isOwner ? "auto" : "none" }}
            className="flex flex-col items-center justify-between"
          >
            <span className={styles.rankBlockTitle}>Ранг</span>
            <div className="flex flex-col items-center">
              <span
                className={styles.rankName}
                style={{ color: userRank.color }}
              >
                {userRank.name}
              </span>
              <div className="flex items-center gap-1">
                <RatingIcon color={userRank.color} width={14} />
                <span
                  className={styles.rankPoints}
                  style={{ color: userRank.color }}
                >
                  {formatRatingPoints(user?.ratingPoints)} RP
                </span>
              </div>
            </div>
          </Link>
          <div className="flex flex-col items-end justify-between">
            <div className="flex flex-col items-end">
              <div className="flex flex-col items-end">
                <span className={styles.locationTitle}>Местоположение</span>
                <span className={styles.location}>
                  {user?.location || "Не установлено"}
                </span>
              </div>
              {user?.githubUrl && (
                <Link
                  href={user?.githubUrl}
                  className={`${styles.githubLink} flex items-center`}
                >
                  <GitHubIcon />
                  <span>GitHub</span>
                </Link>
              )}
            </div>
            {isOwner && (
              <Link href="/edit-profile" className={styles.editProfileLink}>
                Редактировать
              </Link>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className={styles.aboutBlockTitle}>Обо мне</p>
          <p className={styles.aboutBlockDescription}>
            {user?.bio || "Информации нет"}
          </p>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-5 flex-wrap gap-5">
          <PageTitle title="Коллабы">
            <FoldersIcon />
          </PageTitle>
          {isOwner && (
            <Link
              href="/create"
              className={`${styles.createCollabButton} flex items-center`}
            >
              <CreateIcon width={25} color="#2D3436" />
              <span>Создать</span>
            </Link>
          )}
        </div>

        {collabs.length !== 0 ? (
          <div className="flex flex-col gap-7 mt-12 my-10">
            <PageContent initialCollabs={collabs} authUser={session?.user} />{" "}
          </div>
        ) : (
          <p className={styles.noCollabsText}>Список коллаб пуст</p>
        )}
      </div>
    </main>
  );
};

export default User;
