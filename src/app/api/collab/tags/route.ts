import prismadb from "@/lib/prisma/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = await prismadb.collab.findMany({
    where: {
      tags: {
        has: req.nextUrl.searchParams.get("tag"),
      },
    },
    select: {
      author: true,
      id: true,
      title: true,
      createdAt: true,
      comments: true,
      stack: true,
      tags: true,
      viewsCount: true,
    },
  });

  return NextResponse.json(data, { status: 200 });
}
