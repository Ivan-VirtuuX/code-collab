import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prisma/prismadb";

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const id = context.params.id;

  const collab = await prismadb.collab.findUnique({ where: { id } });

  return NextResponse.json({ collab });
};
