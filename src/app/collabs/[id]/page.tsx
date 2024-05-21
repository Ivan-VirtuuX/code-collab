import { Metadata } from "next";
import { ICollab } from "@/types/Collab";
import axios from "axios";

async function getCollab(id: string) {
  const { data } = await axios.get(
    `https://code-collab-six.vercel.app/api/collab/${id}`
  );

  return data.collab;
}

export const metadata: Metadata = {
  title: "Collab",
  icons: {
    icon: "/favicons/collabs-page.svg",
  },
};

const Collab = async ({ params }: { params: { id: string } }) => {
  const collab: ICollab = await getCollab(params.id);

  console.log(collab);

  return (
    <main className="container">
      <div>{collab.title}</div>
    </main>
  );
};

export default Collab;
