import prismadb from "@/lib/prisma/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/utils/auth";
import { OutputBlockData } from "@editorjs/editorjs";

export async function GET(req: NextRequest) {
  const data = await prismadb.collab.findMany({
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

export async function POST(req: NextRequest) {
  const { stack, title, body, tags } = await req.json();

  const session = await auth();

  const textContent = body
    .map((block: OutputBlockData["data"]) => block.data.text)
    .join(" ");

  const collab = await prismadb.collab.create({
    data: {
      author: {
        connect: {
          login: session?.user?.login,
        },
      },
      comments: {
        create: [],
      },
      stack,
      title,
      body,
      textContent,
      viewsCount: 0,
      tags,
      createdAt: new Date(),
    },
  });

  await prismadb.pointsHistory.create({
    data: {
      author: {
        connect: {
          login: session?.user?.login,
        },
      },
      collab: {
        connect: {
          id: collab.id,
        },
      },
      eventType: "Публикация Коллабы",
      points: 50,
    },
  });

  await prismadb.user.update({
    where: {
      login: session?.user?.login,
    },
    data: {
      ratingPoints: {
        increment: 50,
      },
    },
  });

  return NextResponse.json(
    { collab, message: "Collab created" },
    { status: 201 }
  );
}
