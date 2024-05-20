import { Metadata, NextPage } from "next";
import React from "react";
import { CreateCollabForm } from "@/components/CreateCollabForm";
import { getServerSession } from "next-auth";
import authOptions from "@/app/utils/auth";

export const metadata: Metadata = {
  title: "Создание коллабы",
  icons: {
    icon: "/favicons/create-page.svg",
  },
};

const Create: NextPage = async () => {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  return (
    <main className="container">
      <CreateCollabForm user={user} />
    </main>
  );
};

export default Create;
