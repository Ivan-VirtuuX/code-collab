import * as bcrypt from "bcrypt";
import prismadb from "@/lib/prisma/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { login, password } = await req.json();

  if (!login || !password)
    return new NextResponse("Логин и пароль обязательны", { status: 400 });

  const user = await prismadb.user.findUnique({
    where: {
      login,
    },
  });

  if (user)
    return new NextResponse("Пользователь с таким логином уже существует", {
      status: 400,
    });

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await prismadb.user.create({
    data: {
      login,
      bio: "",
      avatarUrl: "",
      githubUrl: "",
      ratingPoints: 500,
      location: "",
      passwordHash,
      createdAt: new Date(),
    },
  });

  return NextResponse.json(newUser);
};
