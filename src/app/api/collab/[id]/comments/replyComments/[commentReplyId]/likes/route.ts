import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prisma/prismadb";
import { auth } from "@/app/utils/auth";

export const POST = async (
  req: NextRequest,
  context: {
    params: { id: string; commentReplyId: string };
  }
) => {
  const collabId = context.params.id;
  const commentReplyId = context.params.commentReplyId;
  const session = await auth();

  const like = await prismadb.commentLike.create({
    data: {
      author: {
        connect: {
          login: session?.user.login,
        },
      },
      comment: {
        connect: {
          id: commentReplyId,
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
