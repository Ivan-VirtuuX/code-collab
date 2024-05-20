"use client";

import styles from "./LogoutButton.module.scss";

import { signOut } from "next-auth/react";
import { ExitIcon } from "@/ui/ExitIcon";

import React from "react";

export const LogoutButton = () => {
  return (
    <div className={styles.signOutButton} onClick={() => signOut()}>
      <ExitIcon />
    </div>
  );
};
