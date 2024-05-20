import React from "react";
import { IUser } from "@/types/User";
import { DefaultAvatar } from "@/ui/DefaultAvatar";

import styles from "./UserInfo.module.scss";
import { getRank } from "@/helpers/getRank";
import { RatingIcon } from "@/ui/RatingIcon";
import { formatRatingPoints } from "@/helpers/formatRatingPoints";
import Link from "next/link";

interface UserInfoProps extends IUser {}

export const UserInfo: React.FC<UserInfoProps> = ({
  createdAt,
  ratingPoints,
  avatarUrl,
  githubUrl,
  location,
  login,
}) => {
  const color = getRank(ratingPoints).color;

  return (
    <Link href={`/${login}`}>
      <div>
        <div className="flex items-center">
          {avatarUrl ? (
            <img className={styles.avatar} src={avatarUrl} alt="avatar" />
          ) : (
            <div className={styles.avatar}>
              <DefaultAvatar />
            </div>
          )}
          <div className="flex flex-col">
            <p className={styles.login}>{login}</p>
            <div className={`${styles.rank} flex flex-col`} style={{ color }}>
              <span style={{ color: color }}>{getRank(ratingPoints).name}</span>
              <span className="flex items-center gap-1">
                <RatingIcon color={color} width={12} />
                {formatRatingPoints(ratingPoints)} RP
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
