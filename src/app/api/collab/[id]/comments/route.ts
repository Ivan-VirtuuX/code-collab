import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prisma/prismadb";
import { auth } from "@/app/utils/auth";

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "2", 10);
  const id = context.params.id;

  const comments = await prismadb.comment.findMany({
    where: {
      collabId: id,
    },
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      text: true,
      createdAt: true,
      author: true,
      likes: {
        select: {
          author: true,
          id: true,
        },
      },
      collabId: true,
      replies: {
        select: {
          author: true,
          text: true,
          createdAt: true,
          id: true,
          likes: {
            select: {
              author: true,
              id: true,
            },
          },
          collabId: true,
          commentId: true,
        },
      },
    },
  });

  const totalComments = await prismadb.comment.count({
    where: { collabId: id },
  });

  return NextResponse.json({ comments, totalComments });
};

export const POST = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const { text } = await req.json();
  const id = context.params.id;
  const session = await auth();

  const comment = await prismadb.comment.create({
    data: {
      author: {
        connect: {
          login: session?.user.login,
        },
      },
      collab: {
        connect: {
          id,
        },
      },
      text,
      createdAt: new Date(),
    },
  });

  return NextResponse.json(
    {
      comment: { ...comment, likes: [], author: session?.user },
      message: "Comment created",
    },
    { status: 201 }
  );
};
