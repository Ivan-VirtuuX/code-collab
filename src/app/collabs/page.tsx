import { Metadata, NextPage } from "next";
import { PageTitle } from "@/components/PageTitle";
import { PeopleIcon } from "@/ui/PeopleIcon";

import styles from "./CollabsPage.module.scss";
import { CollabItem } from "@/components/CollabItem";
import { ICollab } from "@/types/Collab";
import prismadb from "@/lib/prisma/prismadb";

const getCollabs = async (type: "new" | "popular" | "all") => {
  const collabs = await prismadb.collab.findMany();

  return collabs;
};

export const metadata: Metadata = {
  title: "Коллабы",
  icons: {
    icon: "/favicons/collabs-page.svg",
  },
};

const Collabs: NextPage = () => {
  const collabs: ICollab[] = [
    {
      id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
      author: {
        id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
        login: "darelamy",
        avatarUrl: "",
        githubUrl: "https://github.com/darelamy",
        ratingPoints: 9500,
        location: "Омск",
        createdAt: new Date(),
      },
      comments: [
        {
          id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
          author: {
            id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
            login: "darelamy",
            avatarUrl: "",
            githubUrl: "https://github.com/darelamy",
            ratingPoints: 9500,
            location: "Омск",
            createdAt: new Date(),
          },
          likes: [
            {
              id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
              author: {
                id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
                login: "darelamy",
                avatarUrl: "",
                githubUrl: "https://github.com/darelamy",
                ratingPoints: 9500,
                location: "Омск",
                createdAt: new Date(),
              },
            },
          ],
          createdAt: new Date(),
        },
      ],
      title: "Коллаб",
      createdAt: new Date(),
      body: "Коллаб",
      tags: ["веб-разработка", "frontend"],
      viewsCount: 45,
      stack: [
        {
          id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
          name: "react",
        },
        {
          id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
          name: "javascript",
        },
      ],
    },
    {
      id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
      author: {
        id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
        login: "darelamy",
        avatarUrl: "",
        githubUrl: "https://github.com/darelamy",
        ratingPoints: 9500,
        location: "Омск",
        createdAt: new Date(),
      },
      comments: [
        {
          id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
          author: {
            id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
            login: "darelamy",
            avatarUrl: "",
            githubUrl: "https://github.com/darelamy",
            ratingPoints: 9500,
            location: "Омск",
            createdAt: new Date(),
          },
          likes: [
            {
              id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
              author: {
                id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
                login: "darelamy",
                avatarUrl: "",
                githubUrl: "https://github.com/darelamy",
                ratingPoints: 9500,
                location: "Омск",
                createdAt: new Date(),
              },
            },
          ],
          createdAt: new Date(),
        },
      ],
      title: "Коллаб",
      createdAt: new Date(),
      body: "Коллаб",
      tags: ["веб-разработка", "frontend", "typescript", "javascript", "html"],
      viewsCount: 45,
      stack: [
        {
          id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
          name: "react",
        },
        {
          id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
          name: "typescript",
        },
        {
          id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
          name: "javascript",
        },
        {
          id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
          name: "html",
        },
        {
          id: "d5d4e281-33af-49ce-99dc-091a64829cfe",
          name: "webpack",
        },
      ],
    },
  ];

  return (
    <main className="container">
      <div className="flex items-center justify-between mt-10 flex-wrap gap-2">
        <PageTitle title="Коллабы">
          <PeopleIcon />
        </PageTitle>
        <div className="flex gap-3">
          <button className={styles.filterButton}>Новые</button>
          <button className={styles.filterButton}>Популярные</button>
        </div>
      </div>
      <div className="flex flex-col gap-7 mt-12 my-10">
        {collabs.map((collab) => (
          <CollabItem key={collab.id} {...collab} />
        ))}
      </div>
    </main>
  );
};

export default Collabs;
