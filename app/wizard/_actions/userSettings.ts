"use server";

import prisma from "@/lib/db";
import { UpdateCurrencySchema } from "@/schema/userSettings";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function UpdateCurrency(currency: string) {
  const parseBody = UpdateCurrencySchema.safeParse({ currency });
  if (!parseBody.success) {
    throw parseBody.error;
  }
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = await prisma.userSettings.update({
    where: {
      userId: user.id,
    },
    data: {
      currency,
    },
  });
  return userSettings;
}
