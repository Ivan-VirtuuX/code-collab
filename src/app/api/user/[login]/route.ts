import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prisma/prismadb";

export async function GET(
  req: NextRequest,
  { params }: { params: { login: string } }
) {
  const login = params.login;

  const data = await prismadb.user.findUnique({
    where: {
      login,
    },
  });

  return NextResponse.json(data, { status: 200 });
}
