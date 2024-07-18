import prisma from "@/lib/db";
import { Period, Timeframe } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { getDaysInMonth } from "date-fns";
import { redirect } from "next/navigation";
import { z } from "zod";

const getHistoryDataSchema = z.object({
  timeframe: z.enum(["year", "month"]),
  month: z.coerce.number().min(0).max(11),
  year: z.coerce.number().min(2000).max(3000),
});

export async function GET(request: Request) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
    return; // Tambahkan return setelah redirect
  }

  const { searchParams } = new URL(request.url);
  const timeframe = searchParams.get("timeframe");
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  const queryParams = getHistoryDataSchema.safeParse({
    timeframe,
    month,
    year,
  });

  if (!queryParams.success) {
    return new Response(JSON.stringify(queryParams.error.message), {
      status: 400,
    });
  }

  const data = await getHistoryData(user.id, queryParams.data.timeframe, {
    month: queryParams.data.month,
    year: queryParams.data.year,
  });

  return Response.json(data, {
    status: 200,
  });
}

export type GetHistoryDataResponseType = Awaited<
  ReturnType<typeof getHistoryData>
>;

async function getHistoryData(
  userId: string,
  timeframe: Timeframe,
  period: Period
) {
  switch (timeframe) {
    case "year":
      return await getYearHistoryData(userId, period.year);
    case "month":
      return await getMonthHistoryData(userId, period.month, period.year);
  }
}

type HistoryData = {
  expanse: number;
  income: number;
  month: number;
  year: number;
  day?: number;
};

async function getYearHistoryData(userId: string, year: number) {
  const result = await prisma.yearHistory.groupBy({
    by: ["month"],
    where: {
      userId,
      year,
    },
    _sum: {
      income: true,
      expanse: true,
    },
    orderBy: {
      month: "asc",
    },
  });
  if (!result || result.length === 0) return [];

  const history: HistoryData[] = [];

  for (let i = 0; i < 12; i++) {
    let expanse = 0;
    let income = 0;

    const month = result.find((row) => row.month === i);
    if (month) {
      expanse = month._sum.expanse || 0;
      income = month._sum.income || 0;
    }
    history.push({
      expanse,
      income,
      month: i,
      year,
    });
  }

  return history;
}

async function getMonthHistoryData(
  userId: string,
  month: number,
  year: number
) {
  const result = await prisma.monthHistory.groupBy({
    by: ["day"],
    where: {
      userId,
      year,
      month,
    },
    _sum: {
      expanse: true,
      income: true,
    },
    orderBy: [
      {
        day: "asc",
      },
    ],
  });

  if (!result || result.length === 0) return [];

  const history: HistoryData[] = [];
  const daysInMonth = getDaysInMonth(new Date(year, month));

  for (let i = 1; i <= daysInMonth; i++) {
    let expanse = 0;
    let income = 0;
    const day = result.find((row) => row.day === i);
    if (day) {
      expanse = day._sum.expanse || 0;
      income = day._sum.income || 0;
    }
    history.push({
      expanse,
      income,
      month,
      year,
      day: i,
    });
  }
  return history;
}
