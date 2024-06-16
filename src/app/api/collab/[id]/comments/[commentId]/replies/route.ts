import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prisma/prismadb";
import { auth } from "@/app/utils/auth";

export const POST = async (
  req: NextRequest,
  context: { params: { id: string; commentId: string } }
) => {
  const { text } = await req.json();
  const commentId = context.params.commentId;
  const collabId = context.params.id;
  const session = await auth();

  await prismadb.pointsHistory.create({
    data: {
      author: {
        connect: {
          login: session?.user?.login,
        },
      },
      collab: {
        connect: {
          id: collabId,
        },
      },
      eventType: "Ответ на комментарий",
      points: 5,
    },
  });

  await prismadb.user.update({
    where: {
      login: session?.user?.login,
    },
    data: {
      ratingPoints: {
        increment: 5,
      },
    },
  });

  const comment = await prismadb.commentReply.create({
    data: {
      author: {
        connect: {
          login: session?.user.login,
        },
      },
      collab: {
        connect: {
          id: collabId,
        },
      },
      likes: {
        create: [],
      },
      comment: {
        connect: {
          id: commentId,
        },
      },
      text,
      createdAt: new Date(),
    },
  });

  return NextResponse.json(
    {
      comment: { ...comment, likes: [], author: session?.user },
      message: "Comment reply created",
    },
    { status: 201 }
  );
};
