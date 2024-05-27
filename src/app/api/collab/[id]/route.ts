import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prisma/prismadb";
import { auth } from "@/app/utils/auth";

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const id = context.params.id;

  const collab = await prismadb.collab.findUnique({
    where: { id },
    select: {
      author: true,
      id: true,
      title: true,
      createdAt: true,
      comments: true,
      stack: true,
      tags: true,
      viewsCount: true,
      body: true,
    },
  });

  return NextResponse.json({ collab }, { status: 200 });
};

export const DELETE = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const id = context.params.id;

  const session = await auth();

  const collab = await prismadb.collab.findUnique({
    where: { id },
  });

  const user = await prismadb.user.findUnique({
    where: { login: session?.user.login },
  });

  if (collab?.authorId !== user?.id)
    return NextResponse.json(
      { message: "You are not allowed to delete this collab" },
      { status: 401 }
    );

  await prismadb.collab.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Collab deleted" }, { status: 200 });
};
