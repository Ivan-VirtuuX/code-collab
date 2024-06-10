import React from "react";

import styles from "./RankListItem.module.scss";
import { IRank } from "@/types/Rank";
import { convertHexToRgba } from "@/helpers/convertHexToRgba";
import { formatRatingPoints } from "@/helpers/formatRatingPoints";

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
          <p className={`${styles.ratingPoints} text-center`}>
            {minPoints === 1000 ? "до" : "для"} {formatRatingPoints(minPoints)}{" "}
            RP
          </p>
        ) : (
          <p className={`${styles.ratingPoints} text-center`}>
            {formatRatingPoints(minPoints)} RP и более
          </p>
        )}
      </div>
    </div>
  );
};
