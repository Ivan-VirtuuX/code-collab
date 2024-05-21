import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/utils/auth";
import prismadb from "@/lib/prisma/prismadb";

export async function PATCH(req: NextRequest) {
  const { avatarUrl } = await req.json();

  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  session.user.avatarUrl = avatarUrl;

  await prismadb.user.update({
    where: {
      login: session?.user?.login,
    },
    data: {
      avatarUrl,
    },
  });

  return NextResponse.json({ message: "Avatar updated" }, { status: 200 });
}
