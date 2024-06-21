import { Metadata, NextPage } from "next";

import { PageTitle } from "@/components/PageTitle";

import { SearchIcon } from "@/ui/SearchIcon";

import { PageContent } from "./PageContent";

export const metadata: Metadata = {
  title: "Регистрация",
  icons: {
    icon: "/logo.svg",
  },
};

const Search: NextPage = () => {
  return (
    <main className="container">
      <div className="mt-12 mb-8">
        <PageTitle title="Поиск">
          <SearchIcon width={50} color="#007BFF" />
        </PageTitle>
      </div>
      <PageContent />
    </main>
  );
};

export default Search;
