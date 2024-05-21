import { Metadata, NextPage } from "next";

import styles from "@/styles/Home.module.scss";
import { CommunityIcon } from "@/ui/CommunityIcon";
import { BookIcon } from "@/ui/BookIcon";
import { RatingIcon } from "@/ui/RatingIcon";
import { QuestionIcon } from "@/ui/QuestionIcon";
import { ArrowRightIcon } from "@/ui/ArrowRightIcon";
import { GraphIcon } from "@/ui/GraphIcon";
import { FeatureItem } from "@/components/FeatureItem";
import { StarIcon } from "@/ui/StarIcon";
import { PlusIcon } from "@/ui/PlusIcon";
import { LockIcon } from "@/ui/LockIcon";
import { ArrowUpIcon } from "@/ui/ArrowUpIcon";
import { LeaderboardIcon } from "@/ui/LeaderboardIcon";
import { RankListItem } from "@/components/RankListItem";
import { IUser } from "@/types/User";
import { ReviewItem } from "@/components/ReviewItem";
import { ranks } from "@/helpers/getRank";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Code Collab",
  icons: {
    icon: "/logo.svg",
  },
};

const platformFeatures = [
  {
    id: 1,
    title: "Сообщество экспертов",
    description:
      "Общайтесь с другими разработчиками, делитесь своим опытом и находите ответы на свои вопросы в нашем дружелюбном сообществе",
    icon: <CommunityIcon />,
    color: "#2C3E50",
  },
  {
    id: 2,
    title: "Полезные ресурсы",
    description:
      "От статей и видеоуроков до полезных инструментов и рекомендаций - у нас есть все необходимое для вашего успеха в мире программирования",
    icon: <BookIcon />,
    color: "#00B894",
  },
  {
    id: 3,
    title: "Система рейтинга",
    description:
      "На нашей платформе есть система рейтинга, которая позволяет оценить других участников сообщества",
    icon: <RatingIcon />,
    color: "#F39C12",
  },
  {
    id: 4,
    title: "Отзывчивая поддержка",
    description:
      "Наше сообщество готово помочь вам решить проблемы или ответить на любые ваши вопросы",
    icon: <QuestionIcon />,
    color: "#F31222",
  },
];
const ratingSystemFeatures = [
  {
    id: 1,
    title: "Оценка участников",
    description:
      "Пользователи могут оценить вклад других участников, выражая благодарность за полезные ответы, полезные комментарии",
    icon: <StarIcon />,
    color: "#8948F9",
  },
  {
    id: 2,
    title: "Бонусы и привилегии",
    description:
      "Пользователи с высоким рейтингом получают особые бонусы и привилегии, такие как доступ к закрытым ресурсам",
    icon: <PlusIcon />,
    color: "#002CB8",
  },
  {
    id: 3,
    title: "Прозрачность и открытость",
    description:
      "Наша система рейтинга прозрачна и открыта для всех участников. \n" +
      "Вы можете увидеть свой рейтинг и рейтинг других участников, чтобы понять свое место в сообществе и поощрить активных участников",
    icon: <LockIcon />,
    color: "#2D3436",
  },
  {
    id: 4,
    title: "Получение рейтинга",
    description:
      "Каждый пользователь имеет свой уникальный рейтинг, который рассчитывается на основе активности и оценок от других участников. \n" +
      "Чем больше ваш вклад оценивают другие пользователи, тем выше ваш рейтинг",
    icon: <ArrowUpIcon />,
    color: "#FF5F7A",
  },
];
const reviewsList: { id: string; user: IUser; text: string }[] = [
  {
    id: "cd213fc6-11e7-4f18-91fe-7208f27004db",
    user: {
      id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
      login: "Darelamy",
      avatarUrl: "",
      githubUrl: "https://github.com/darelamy",
      ratingPoints: 9500,
      location: "Омск",
      createdAt: new Date(),
    },
    text: "Я пользуюсь этой платформой уже несколько месяцев, и могу сказать, что это действительно золотая жила для разработчиков. Курсы здесь не только информативны, но и вдохновляющи! Я был приятно удивлен глубиной материала и темпом, с которым я могу двигаться вперед. Спасибо всему сообществу за такое теплое и дружелюбное приветствие новичков! Я никогда не чувствовал себя так уверенно в своих навыках программирования, как сейчас. Продолжайте в том же духе!",
  },
  {
    id: "6a5a3046-b043-43b4-8442-4c8edec797a4",
    user: {
      id: "46d80d97-2091-4cdc-9beb-b5eb7df450d7",
      login: "DevGenius365",
      avatarUrl: "",
      githubUrl: "https://github.com/DevGenius365",
      ratingPoints: 10500,
      location: "Москва",
      createdAt: new Date(),
    },
    text: "Это просто потрясающее место для всех, кто увлечен программированием! Здесь я нашел не только ответы на свои вопросы, но и настоящее сообщество единомышленников. Сообщество здесь очень отзывчивое и готово помочь в любой ситуации. Я получил массу полезных советов и рекомендаций, которые помогли мне улучшить свои навыки и продвинуться в карьере. Большое спасибо за вашу работу!",
  },
  {
    id: "1ea8220a-2d34-48c5-8625-05c2d81957f6",
    user: {
      id: "2f04a490-c99e-4b9d-bd0f-f7187536a872",
      login: "CodeJourney21",
      avatarUrl: "",
      githubUrl: "https://github.com/CodeJourney21",
      ratingPoints: 7200,
      location: "Омск",
      createdAt: new Date(),
    },
    text: "Я недавно присоединился к этой платформе, и я не могу нарадоваться тому, как много я уже узнал. Курсы представлены очень профессионально, и я чувствую, что моя карьера в программировании действительно приносит мне радость. Более того, сообщество здесь дружелюбное и готово помочь. Я чувствую, что я действительно принадлежу к месту, где могу развиваться и расти вместе с другими. Большое спасибо за вашу работу!",
  },
];

const Home: NextPage = () => {
  return (
    <>
      <main className="container">
        <section className={`${styles.intro} ${styles.section}`}>
          <div className="flex flex-col items-center relative">
            <div className={styles.introArrow}>
              <ArrowRightIcon />
            </div>
            <p className={styles.introText}>
              Добро пожаловать на{" "}
              <span className={styles.introTextCode}>code</span>{" "}
              <span className={styles.introTextCollab}>Collab</span> -
              веб-платформу для обмена знаниями и опытом в области
              программирования
            </p>
          </div>
          <hr className={styles.orangeLine} />
        </section>
        <section className={`${styles.platformDesc} ${styles.section}`}>
          <h3 className={`${styles.title} text-center`}>
            На нашей платформе вы найдете
          </h3>
          <div className={`${styles.featuresBlock} justify-between`}>
            {platformFeatures.map((feature) => (
              <FeatureItem key={feature.id} {...feature} />
            ))}
          </div>
          <hr className={styles.orangeLine} />
        </section>
        <section className={`${styles.ratingSystem} ${styles.section}`}>
          <h3 className={`${styles.title} text-center`}>Система рейтинга</h3>
          <div className="flex mb-10">
            <div className={styles.ratingSystemIcon}>
              <GraphIcon />
            </div>
            <p className={styles.ratingSystemDesc}>
              На нашей платформе мы предлагаем систему рейтинга, <br /> которая
              позволяет пользователям оценить <span>активность</span>, <br />{" "}
              <span>вклад</span> и <span>влияние</span> других участников
              сообщества. <br /> Эта система рейтинга создана для{" "}
              <span>поощрения</span> участия и <br /> <span>обмена опытом</span>
              , а также для <span>помощи</span> новым участникам <br /> быстрее
              вливаться в сообщество
            </p>
          </div>
          <div>
            <h4 className={`${styles.subTitle} text-center`}>
              Как это работает:
            </h4>
            <div className={`${styles.featuresBlock} justify-between`}>
              {ratingSystemFeatures.map((feature) => (
                <FeatureItem key={feature.id} {...feature} />
              ))}
            </div>
          </div>
          <h3 className={`${styles.subTitle} text-center mt-12`}>
            Ранги в системе RP
          </h3>
          <div className="flex mb-10">
            <div className={styles.ratingSystemIcon}>
              <LeaderboardIcon />
            </div>
            <p className={styles.ratingSystemDesc}>
              На нашей платформе мы представляем систему <br /> ранжирования
              пользователей на основе накопленных <br />{" "}
              <span>рейтинговых очков</span> (RP - <span>Rating Points</span>).
            </p>
          </div>
          <h3 className={`${styles.title} mt-12 text-center`}>Список рангов</h3>
          <div className={`${styles.rankList} flex flex-wrap`}>
            {ranks.map((rank) => (
              <RankListItem key={rank.id} {...rank} />
            ))}
          </div>
          <hr className={styles.orangeLine} />
        </section>
        <section className={`${styles.reviewsBlock} ${styles.section}`}>
          <h3 className={`${styles.title} text-center`}>
            Отзывы пользователей
          </h3>
          <div className={styles.reviewsList}>
            {reviewsList.map((review) => (
              <div
                key={review.id}
                style={
                  review.id !== reviewsList.at(-1)?.id
                    ? {
                        borderBottom: "0.5px solid rgb(189, 195, 199)",
                        paddingBottom: 40,
                        marginBottom: 40,
                      }
                    : {}
                }
              >
                <ReviewItem {...review} />
              </div>
            ))}
          </div>
          <hr className={styles.orangeLine} />
        </section>
        <section className={`${styles.joinUs} ${styles.section}`}>
          <div className={styles.joinUsContainer}>
            <h3 className={`${styles.title} text-center`}>
              Присоединяйтесь к нам прямо сейчас!
            </h3>
            <div className={`${styles.joinUsContent} flex gap-10`}>
              <img
                className={styles.joinUsImage}
                src="/img/code.png"
                alt="code image"
              />
              <div
                className={`${styles.joinUsTextBlock} flex flex-col justify-between items-start`}
              >
                <p className={styles.joinUsText}>
                  Присоединяйтесь к нашему сообществу{" "}
                  <span className={styles.joinUsTextCode}>code</span>{" "}
                  <span className={styles.joinUsTextCollab}>Collab</span> уже
                  сегодня, чтобы начать свой путь к успеху в мире
                  программирования!
                  <br />
                  Получите доступ к дружелюбному сообществу разработчиков,
                  полезным ресурсам и возможностям для личного и
                  профессионального роста.
                </p>
                <Link href="/register" className={styles.joinUsButton}>
                  Присоединиться
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
