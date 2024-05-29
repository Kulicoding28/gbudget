import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function GET(request: Request) {
  const user = await currentUser();
  if (!currentUser) {
    redirect("/sign-in");
  }

  const { searchParams } = new URL(request.url);
  const paramType = searchParams.get("type");

  const validator = z.enum(["expanse", "income"]).nullable();
  const queryParams = validator.safeParse(paramType);
  if (!queryParams.success) {
    return Response.json(queryParams.error, {
      status: 400,
    });
  }

  const type = queryParams.data;
  const categories = await prisma.category.findMany({
    where: {
      userId: user?.id,
      //   include type in the filters if it's defind
      ...(type && { type }),
    },
    orderBy: {
      name: "asc",
    },
  });
  return Response.json(categories);
}
