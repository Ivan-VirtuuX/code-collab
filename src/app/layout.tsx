import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import { Header } from "@/components/Header";

import "@/styles/globals.scss";
import { Provider } from "../../context/Provider";
import React from "react";
import { MobileNavbar } from "@/components/MobileNavbar";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <Provider>
        <body className={rubik.className}>
          <Header />
          {children}
          <MobileNavbar />
        </body>
      </Provider>
    </html>
  );
}
