import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prisma/prismadb";
import { auth } from "@/app/utils/auth";

export const POST = async (
  req: NextRequest,
  context: {
    params: { id: string; commentId: string };
  }
) => {
  const { userId } = await req.json();

  const commentId = context.params.commentId;
  const collabId = context.params.id;

  const session = await auth();

  const existingHistory = await prismadb.pointsHistory.findFirst({
    where: {
      authorId: userId,
      collabId: collabId,
      eventType: "Получение лайка на комментарий",
    },
  });

  if (!existingHistory) {
    await prismadb.pointsHistory.create({
      data: {
        author: {
          connect: {
            id: userId,
          },
        },
        collab: {
          connect: {
            id: collabId,
          },
        },
        eventType: "Получение лайка на комментарий",
        points: 2,
      },
    });

    await prismadb.user.update({
      where: {
        login: session?.user?.login,
      },
      data: {
        ratingPoints: {
          increment: 2,
        },
      },
    });
  }

  const like = await prismadb.commentLike.create({
    data: {
      author: {
        connect: {
          login: session?.user.login,
        },
      },
      comment: {
        connect: {
          id: commentId,
        },
      },
      createdAt: new Date(),
    },
  });

  return NextResponse.json(
    { like, message: "Comment like created" },
    { status: 201 }
  );
};
