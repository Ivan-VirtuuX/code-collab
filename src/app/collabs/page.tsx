import { Metadata, NextPage } from "next";
import { CollabsPageContent } from "@/app/collabs/CollabsPageContent";

export const metadata: Metadata = {
  title: "Коллабы",
  icons: {
    icon: "/favicons/collabs-page.svg",
  },
};

const Collabs: NextPage = async () => {
  return (
    <main className="container">
      <CollabsPageContent />
    </main>
  );
};

export default Collabs;
