import React from "react";

import { IRank } from "@/types/Rank";

import { convertHexToRgba } from "@/helpers/convertHexToRgba";
import { formatRatingPoints } from "@/helpers/formatRatingPoints";

import styles from "./RankListItem.module.scss";

interface RankListItemProps extends IRank {}

export const RankListItem: React.FC<RankListItemProps> = ({
  minPoints,
  name,
  color,
}) => {
  return (
    <div
      className={styles.container}
      style={{
        boxShadow: `0 4px 20px 0 ${convertHexToRgba(color)}`,
        borderColor: color,
      }}
    >
      <div>
        <p className={`${styles.name} text-center`} style={{ color }}>
          {name}
        </p>
        <hr className={styles.line} style={{ borderColor: color }} />
        {Number(minPoints) < 10000 ? (
          minPoints !== 0 ? (
            <p className={`${styles.ratingPoints} text-center`}>
              для {formatRatingPoints(minPoints)} RP
            </p>
          ) : (
            <p className={`${styles.ratingPoints} text-center`}>до 1.000 RP</p>
          )
        ) : (
          <p className={`${styles.ratingPoints} text-center`}>
            {formatRatingPoints(minPoints)} RP и более
          </p>
        )}
      </div>
    </div>
  );
};
