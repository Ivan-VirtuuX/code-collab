import { Metadata, NextPage } from "next";
import { getServerSession } from "next-auth";

import { CollabsPageContent } from "@/app/collabs/CollabsPageContent";
import authOptions from "@/app/utils/auth";

export const metadata: Metadata = {
  title: "Коллабы",
  icons: {
    icon: "/favicons/collabs-page.svg",
  },
};

const Collabs: NextPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className="container">
      <CollabsPageContent authUser={session?.user} />
    </main>
  );
};

export default Collabs;
