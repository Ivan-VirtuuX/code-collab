import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/utils/auth";
import prismadb from "@/lib/prisma/prismadb";

export async function PATCH(req: NextRequest) {
  const { login, location, githubUrl, bio } = await req.json();

  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  session.user = { ...session.user, login, location, githubUrl, bio };

  try {
    await prismadb.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        login,
        location,
        githubUrl,
        bio,
      },
    });
    return NextResponse.json({ message: "Profile updated" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Логин занят" }, { status: 500 });
  }
}
