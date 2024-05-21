import styles from "./Header.module.scss";
import { Logo } from "@/ui/Logo";
import React from "react";
import Link from "next/link";
import { PeopleIcon } from "@/ui/PeopleIcon";
import { UserIcon } from "@/ui/UserIcon";
import { getServerSession } from "next-auth";
import authOptions from "@/app/utils/auth";
import { LogoutButton } from "@/components/LogoutButton";
import { CreateIcon } from "@/ui/CreateIcon";
import { SearchIcon } from "@/ui/SearchIcon";

export const Header: React.FC = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={`${styles.inner} flex justify-between`}>
          <div className="flex items-center gap-12">
            <Link href="/" className="logo flex items-center gap-1">
              <Logo />
              <span className={styles.logoText}>
                <span className={styles.logoTextCode}>code </span>
                <span className={styles.logoTextCollab}>Collab</span>
              </span>
            </Link>
            <ul className={`${styles.links} flex items-center gap-6`}>
              <li>
                <Link
                  href="/collabs"
                  className={`${styles.link} flex items-center`}
                >
                  <PeopleIcon width={18} color="#2D3436" />
                  <span>Коллабы</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/create"
                  className={`${styles.link} flex items-center`}
                >
                  <CreateIcon width={18} color="#2D3436" />
                  <span>Создать</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className={`${styles.searchBtn} flex items-center gap-1`}
                >
                  <SearchIcon width={18} color="#2D3436" />
                  <span>Поиск</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="right flex items-center gap-5">
            {user ? (
              <div className="flex items-center">
                <Link href={`/u/${user.login}`}>
                  <div className={`${styles.login} flex items-center`}>
                    <UserIcon />
                    <span>{user.login}</span>
                  </div>
                </Link>
                <LogoutButton />
              </div>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" className={styles.loginBtn}>
                  Вход
                </Link>
                <Link href="/register" className={styles.registerBtn}>
                  Регистрация
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
