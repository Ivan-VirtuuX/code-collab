import React from "react";
import { IUser } from "@/types/User";
import { DefaultAvatar } from "@/ui/DefaultAvatar";
import { getRank } from "@/helpers/getRank";

import styles from "./ReviewItem.module.scss";
import { formatRatingPoints } from "@/helpers/formatRatingPoints";
import { RatingIcon } from "@/ui/RatingIcon";

interface ReviewItemProps {
  user: IUser;
  text: string;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({ user, text }) => {
  const color = getRank(user.ratingPoints).color;

  return (
    <div>
      <div className="flex items-center gap-5">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt="avatar" />
        ) : (
          <DefaultAvatar />
        )}
        <div className="flex flex-col">
          <p className={styles.login}>{user.login}</p>
          <div className={`${styles.rank} flex flex-col`} style={{ color }}>
            <span style={{ color: color }}>
              {getRank(user.ratingPoints).name}
            </span>
            <span className="flex items-center gap-1">
              <RatingIcon color={color} width={18} />
              {formatRatingPoints(user.ratingPoints)} RP
            </span>
          </div>
        </div>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
