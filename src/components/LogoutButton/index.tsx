"use client";

import React from "react";

import { signOut } from "next-auth/react";

import { ExitIcon } from "@/ui/ExitIcon";

import styles from "./LogoutButton.module.scss";

export const LogoutButton = () => {
  return (
    <div className={styles.signOutButton} onClick={() => signOut()}>
      <ExitIcon />
    </div>
  );
};
