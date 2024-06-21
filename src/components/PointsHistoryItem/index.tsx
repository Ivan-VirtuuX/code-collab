import React from "react";

import Link from "next/link";

import { IPointsHistory } from "@/types/PointsHistory";

import { formatDate } from "@/helpers/formatDate";

import styles from "./PointsHistoryItem.module.scss";

interface PointsHistoryItemProps extends IPointsHistory {}

export const PointsHistoryItem: React.FC<PointsHistoryItemProps> = ({
  points,
  collab,
  eventType,
  createdAt,
}) => {
  return (
    <div
      className={`${styles.container} flex items-center justify-between gap-2`}
    >
      <span className={styles.createdAt}>{formatDate(createdAt)}</span>
      <div
        className={`${styles.right} flex items-center justify-between gap-2`}
      >
        {eventType === "Публикация Коллабы" ||
        eventType === "Комментарий к Коллабе" ||
        eventType === "Получение лайка на комментарий" ? (
          <Link href={`/collabs/${collab?.id}`}>
            <span className={styles.pointsHistoryItemText}>{eventType}</span>
          </Link>
        ) : (
          <span className={styles.pointsHistoryItemText}>{eventType}</span>
        )}
        <span className={styles.pointsHistoryItemText}>{points} RP</span>
      </div>
    </div>
  );
};
