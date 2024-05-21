import prismadb from "@/lib/prisma/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/utils/auth";

export async function GET(req: NextRequest) {
  const data = await prismadb.collab.findMany({
    select: {
      author: true,
      id: true,
      title: true,
      createdAt: true,
      comments: true,
      stack: true,
      tags: true,
      viewsCount: true,
    },
  });

  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { stack, title, body, tags } = await req.json();

  const session = await auth();

  const collab = await prismadb.collab.create({
    data: {
      author: {
        connect: {
          login: session?.user?.login,
        },
      },
      comments: {
        create: [],
      },
      stack,
      title,
      body,
      viewsCount: 0,
      tags,
      createdAt: new Date(),
    },
  });

  return NextResponse.json(
    { collab, message: "Collab created" },
    { status: 201 }
  );
}

// export async function POST(req: NextRequest) {
//   // const token: any = await getToken({ req, raw: true });
//   //
//   // if (!token) {
//   //   return new NextResponse("Unauthorized", { status: 403 });
//   // }
//   //
//   // const body = JSON.stringify(await req.json());
//   //
//   // const response = await fetch("api/collab/", {
//   //   method: "POST",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //     Authorization: `Bearer ${token}`,
//   //   },
//   //   body,
//   // });
//   //
//   // const result = await response.json();
//   //
//   // console.log("result: ", result);
//   //
//   // if (response.ok) {
//   //   try {
//   //     return NextResponse.json(result);
//   //   } catch (error) {
//   //     console.log("error parsing response", error);
//   //     return NextResponse.json(undefined);
//   //   }
//   // } else {
//   //   return NextResponse.json({
//   //     error: result.error?.message || "An unknown error occurred",
//   //   });
//   // }
//   // if (!session) {
//   //   return res.status(401).json({ error: "Unauthorized" });
//   // }
//   // const { stack, title, body, tags } = req.body;
//   // //
//   // try {
//   //   const collab = await prismadb.collab.create({
//   //     data: {
//   //       authorId: session.user.id,
//   //       comments: undefined,
//   //       stack,
//   //       title,
//   //       body,
//   //       viewsCount: 0,
//   //       tags,
//   //     },
//   //   });
//   //
//   //   return NextResponse.json({ collab }, { status: 201 });
//   // } catch (error) {
//   //   return NextResponse.json(
//   //     { error: "Error creating collab" },
//   //     { status: 500 }
//   //   );
//   // }
// }
