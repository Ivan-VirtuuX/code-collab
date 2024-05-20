import React from "react";

import styles from "./MobileNavbar.module.scss";
import { PeopleIcon } from "@/ui/PeopleIcon";
import Link from "next/link";
import { CreateIcon } from "@/ui/CreateIcon";
import { SearchIcon } from "@/ui/SearchIcon";

export const Index: React.FC = () => {
  const navItems = [
    {
      id: 1,
      text: "Коллабы",
      path: "/collabs",
      icon: <PeopleIcon width={25} color="#2D3436" />,
    },
    {
      id: 2,
      text: "Создать",
      path: "/create",
      icon: <CreateIcon width={25} color="#2D3436" />,
    },
    {
      id: 3,
      text: "Поиск",
      path: "/search",
      icon: <SearchIcon width={25} color="#2D3436" />,
    },
  ];

  return (
    <ul className={`${styles.container} flex items-center justify-center`}>
      <div className="flex justify-center">
        <div className="container flex gap-5">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className={`${styles.link} flex items-center`}
            >
              {item.icon}
              <span>{item.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </ul>
  );
};

export const MobileNavbar = React.memo(Index);
