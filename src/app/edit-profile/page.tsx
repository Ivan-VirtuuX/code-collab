import { Metadata, NextPage } from "next";
import { PageTitle } from "@/components/PageTitle";
import { EditProfileIcon } from "@/ui/EditProfileIcon";
import React from "react";
import { EditProfileForm } from "@/components/EditProfileForm";
import authOptions from "@/app/utils/auth";
import { getServerSession } from "next-auth";

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
