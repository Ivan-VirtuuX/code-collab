import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prisma/prismadb";

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { login } = await req.json();

  const id = context.params.id;

  const existingView = await prismadb.view.findFirst({
    where: {
      collabId: id,
      author: {
        login,
      },
    },
  });

  if (!existingView) {
    await prismadb.view.create({
      data: {
        collab: {
          connect: {
            id,
          },
        },
        author: {
          connect: {
            login,
          },
        },
        createdAt: new Date(),
      },
    });

    await prismadb.collab.update({
      where: { id },
      data: {
        viewsCount: {
          increment: 1,
        },
      },
    });
  }

  return NextResponse.json({ message: "Views count updated" }, { status: 200 });
}
