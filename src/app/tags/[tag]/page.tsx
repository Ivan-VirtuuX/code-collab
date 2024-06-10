import { PageTitle } from "@/components/PageTitle";
import { TagIcon } from "@/ui/TagIcon";
import { Metadata } from "next";
import { Api } from "@/api";
import { CollabsList } from "@/components/CollabsList";

interface MetadataProps {
  params: { id: string; tag: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  return {
    title: `Тег #${decodeURIComponent(params.tag)}`,
    icons: {
      icon: "/favicons/tag-page.svg",
    },
  };
}

const Tag = async ({ params }: { params: { tag: string } }) => {
  const collabs = await Api().collab.getManyByTag(
    decodeURIComponent(params.tag)
  );

  return (
    <main className="container">
      <div className="mt-12 mb-8">
        <PageTitle title={`Тег #${decodeURIComponent(params.tag)}`}>
          <TagIcon />
        </PageTitle>
      </div>
      <CollabsList collabs={collabs} />
    </main>
  );
};

export default Tag;
