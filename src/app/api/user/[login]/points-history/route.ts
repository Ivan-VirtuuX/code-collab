import prismadb from "@/lib/prisma/prismadb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { login: string } }
) => {
  const login = context.params.login;

  const user = await prismadb.user.findUnique({
    where: {
      login,
    },
  });

  const data = await prismadb.pointsHistory.findMany({
    where: {
      authorId: user?.id,
    },
    select: {
      id: true,
      author: true,
      points: true,
      collab: true,
      eventType: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(data, { status: 200 });
};
