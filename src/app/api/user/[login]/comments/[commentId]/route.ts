import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prisma/prismadb";

export const DELETE = async (
  req: NextRequest,
  context: { params: { commentId: string; login: string } }
) => {
  const commentId = context.params.commentId;

  const comment = await prismadb.comment.findUnique({
    where: { id: commentId },
  });

  const user = await prismadb.user.findUnique({
    where: { login: context.params.login },
  });

  if (comment?.authorId !== user?.id)
    return NextResponse.json(
      { message: "You are not allowed to delete this comment" },
      { status: 401 }
    );

  const collab = await prismadb.comment.delete({
    where: { id: commentId },
  });

  return NextResponse.json(
    { message: "Collab comment deleted" },
    { status: 200 }
  );
};
