import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { title, content } = await req.json();

  // const collab = await prismadb.collab.create({ data: {authorId: } });
  //
  // return NextResponse.json({ collab });
};
