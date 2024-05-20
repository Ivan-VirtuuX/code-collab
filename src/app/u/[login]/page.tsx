import { Metadata } from "next";
import prismadb from "@/lib/prisma/prismadb";

const getData = async (login: string) => {
  const user = await prismadb.user.findUnique({
    where: {
      login,
    },
  });

  return user;
};

interface MetadataProps {
  params: { id: string; login: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  return {
    title: params.login,
    icons: {
      icon: "/favicons/user-page.svg",
    },
  };
}

const User = async ({ params }: { params: { login: string } }) => {
  const login = await getData(params.login);

  return <main className="container"></main>;
};

export default User;
