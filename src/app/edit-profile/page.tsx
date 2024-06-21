import React from "react";

import { Metadata, NextPage } from "next";
import { getServerSession } from "next-auth";

import { EditProfileIcon } from "@/ui/EditProfileIcon";

import { PageTitle } from "@/components/PageTitle";
import { EditProfileForm } from "@/components/EditProfileForm";

import authOptions from "@/app/utils/auth";

export const metadata: Metadata = {
  title: "Редактирование профиля",
  icons: {
    icon: "/favicons/edit-profile-page.svg",
  },
};

const EditProfile: NextPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className="container">
      <div className="mt-11 mb-5">
        <PageTitle title="Мой профиль">
          <EditProfileIcon />
        </PageTitle>
      </div>
      <EditProfileForm user={session?.user} />
    </main>
  );
};

export default EditProfile;
