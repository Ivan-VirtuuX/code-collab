import { Metadata, NextPage } from "next";
import React from "react";
import { CreateCollabForm } from "@/components/CreateCollabForm";

export const metadata: Metadata = {
  title: "Создание коллабы",
  icons: {
    icon: "/favicons/create-page.svg",
  },
};

const Create: NextPage = async () => {
  return (
    <main className="container">
      <CreateCollabForm />
    </main>
  );
};

export default Create;
