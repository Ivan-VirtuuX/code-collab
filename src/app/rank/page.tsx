import { Metadata, NextPage } from "next";

import styles from "./Rank.module.scss";
import { PageTitle } from "@/components/PageTitle";
import { StarIcon } from "@/ui/StarIcon";
import { getRank } from "@/helpers/getRank";
import { getServerSession } from "next-auth";
import authOptions from "@/app/utils/auth";
import { getNextRank } from "@/helpers/getNextRank";
import { RatingIcon } from "@/ui/RatingIcon";
import { formatRatingPoints } from "@/helpers/formatRatingPoints";
import { PointsHistoryItem } from "@/components/PointsHistoryItem";
import { Api } from "@/api";
import { IUser } from "@/types/User";

export const metadata: Metadata = {
  title: "Мой ранг",
  icons: {
    icon: "/favicons/rank-page.svg",
  },
};

const Rank: NextPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as IUser;
  const pointsHistory = await Api().user.getPointsHistory(user.login);

  const ratingPoints = user?.ratingPoints || 0;

  const rank = {
    current: {
      ...getRank(ratingPoints),
      points: ratingPoints || 0,
    },
    next: getNextRank(getRank(ratingPoints).id),
  };

  const progressPercentage =
    rank.next.minPoints !== Infinity
      ? ((ratingPoints - rank.current.minPoints) /
          (rank.next.minPoints - rank.current.minPoints)) *
        100
      : 100;

  const isLastRank = rank.current.id === 10;

  return (
    <main className="container">
      <div className="mt-12 mb-8">
        <PageTitle title="Мой ранг">
          <StarIcon width={50} color="#007BFF" />
        </PageTitle>
      </div>
      <div className="flex justify-between flex-wrap gap-5 mb-5">
        <div className={`${styles.leftBlockContainer} flex flex-col gap-12`}>
          <div className={`${styles.blockContainer} ${styles.leftBlock}`}>
            <div className="flex items-center justify-between">
              <span className={styles.statsTitle}>Текущий</span>
              <span className={styles.statsTitle}>Следующий</span>
            </div>
            <div>
              <div className="flex justify-between">
                <span
                  className={styles.statsText}
                  style={{ color: rank.current.color }}
                >
                  {rank.current.name}
                </span>
                {!isLastRank && (
                  <span
                    className={styles.statsText}
                    style={{ color: rank.next.color }}
                  >
                    {rank.next.name}
                  </span>
                )}
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressBarInner}
                  style={{
                    width: isLastRank ? "100%" : `${progressPercentage}%`,
                    backgroundColor: rank.current.color,
                  }}
                ></div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <RatingIcon width={17} color={rank.current.color} />
                  <span
                    className={`${styles.statsText} ${styles.points}`}
                    style={{ color: rank.current.color }}
                  >
                    {formatRatingPoints(rank.current.points)} RP
                  </span>
                </div>
                {!isLastRank && (
                  <div className="flex items-center">
                    <RatingIcon width={17} color={rank.next.color} />
                    <span
                      className={`${styles.statsText} ${styles.points}`}
                      style={{ color: rank.next.color }}
                    >
                      {formatRatingPoints(rank.next.minPoints)} RP
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={`${styles.blockContainer} ${styles.leftBlock}`}>
            <p className={styles.pointsHistoryTitle}>История получения очков</p>
            <div className="mt-5 flex flex-col gap-5">
              {pointsHistory?.map((item) => (
                <PointsHistoryItem key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
        <div className={`${styles.blockContainer} ${styles.rightBlock}`}>
          <div>
            <p className={`${styles.pointEarnTableTitle} text-center`}>
              Таблица получения очков
            </p>
            <div>
              <div className="flex justify-between">
                <span className={styles.pointEarnTableColumnName}>
                  Действие
                </span>
                <span className={styles.pointEarnTableColumnName}>
                  Количество RP
                </span>
              </div>
              <div className="mt-5 flex flex-col gap-4">
                <div
                  className={`${styles.pointEarnTableRow} flex items-center justify-between`}
                >
                  <span>Публикация Коллабы</span>
                  <span>50 RP</span>
                </div>
                <div
                  className={`${styles.pointEarnTableRow} flex items-center justify-between`}
                >
                  <span>Ответ на комментарий</span>
                  <span>5 RP</span>
                </div>
                <div
                  className={`${styles.pointEarnTableRow} flex items-center justify-between`}
                >
                  <span>Комментарий к Коллабе</span>
                  <span>5 RP</span>
                </div>
                <div
                  className={`${styles.pointEarnTableRow} flex items-center justify-between`}
                >
                  <span>Получение лайка на комментарий</span>
                  <span>2 RP</span>
                </div>
                <div
                  className={`${styles.pointEarnTableRow} flex items-center justify-between`}
                >
                  <span>Регистрация на сайте</span>
                  <span>500 RP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Rank;
