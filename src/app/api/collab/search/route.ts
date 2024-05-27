import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prisma/prismadb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const collabs = await prismadb.collab.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            textContent: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
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
    return NextResponse.json(collabs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
