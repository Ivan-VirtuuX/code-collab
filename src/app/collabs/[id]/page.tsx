import { Metadata } from "next";
import { ICollab } from "@/types/Collab";

async function getCollab(id: string) {
  const res = await fetch(`api/collab/${id}`);

  return await res.json();
}

export const metadata: Metadata = {
  title: "Collab",
  icons: {
    icon: "/favicons/collabs-page.svg",
  },
};

const Collab = async ({ params }: { params: { id: string } }) => {
  const collab: ICollab = await getCollab(params.id);

  return <main className="container">{collab.title}</main>;
};

export default Collab;
