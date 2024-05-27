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
    <Link href={`/u/${login}`}>
      <div>
        <div className="flex items-center">
          <div className={styles.avatar}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" />
            ) : (
              <div>
                <DefaultAvatar />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <p className={styles.login} style={{ color }}>
              {login}
            </p>
            <div className={`${styles.rank} flex flex-col`} style={{ color }}>
              <span style={{ color: color }}>{getRank(ratingPoints).name}</span>
              <span className="flex items-center gap-1">
                <RatingIcon color={color} width={14} />
                {formatRatingPoints(ratingPoints)} RP
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
