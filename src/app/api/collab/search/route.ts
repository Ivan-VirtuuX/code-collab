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
    if (query.startsWith("#")) {
      const tag = query.slice(1);

      const collabs = await prismadb.collab.findMany({
        where: {
          tags: {
            has: tag,
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
      return NextResponse.json(collabs, { status: 200 });
    } else {
      // Иначе ищем по названию или содержимому
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
    }

    // const collabs = await prismadb.collab.findMany({
    //   where: {
    //     OR: [
    //       {
    //         title: {
    //           contains: query,
    //           mode: "insensitive",
    //         },
    //       },
    //       {
    //         textContent: {
    //           contains: query,
    //           mode: "insensitive",
    //         },
    //       },
    //     ],
    //   },
    //   select: {
    //     author: true,
    //     id: true,
    //     title: true,
    //     createdAt: true,
    //     comments: true,
    //     stack: true,
    //     tags: true,
    //     viewsCount: true,
    //   },
    // });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
