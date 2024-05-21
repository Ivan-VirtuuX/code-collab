import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prisma/prismadb";

export async function GET(
  req: NextRequest,
  { params }: { params: { login: string } }
) {
  const login = params.login;

  const data = await prismadb.collab.findMany({
    select: {
      author: true,
      id: true,
      title: true,
      comments: true,
      stack: true,
      tags: true,
      viewsCount: true,
      createdAt: true,
    },
    where: {
      author: {
        login,
      },
    },
  });

  return NextResponse.json(data, { status: 200 });
}
