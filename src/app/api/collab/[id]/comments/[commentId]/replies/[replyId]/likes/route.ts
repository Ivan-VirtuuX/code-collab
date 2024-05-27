import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prisma/prismadb";
import { auth } from "@/app/utils/auth";

export const POST = async (
  req: NextRequest,
  context: { params: { id: string; replyId: string } }
) => {
  const replyId = context.params.replyId;
  const session = await auth();

  const like = await prismadb.commentReplyLike.create({
    data: {
      author: {
        connect: {
          login: session?.user.login,
        },
      },
      commentReply: {
        connect: {
          id: replyId,
        },
      },
      createdAt: new Date(),
    },
  });

  return NextResponse.json(
    { like, message: "Reply like created" },
    { status: 201 }
  );
};
