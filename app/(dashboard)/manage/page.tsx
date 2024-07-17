"use client";

import { CurrencyComboBox } from "@/components/CurrencyComboBox";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { TrendingDown, TrendingUp } from "lucide-react";
import CreateCategoryDialog from "../_components/CreateCategoryDialog";

function page() {
  return (
    <>
      {/* header */}
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <div>
            <p className="text-3xl font-bold">Manage</p>
            <p className="text-muted-foreground">
              Manage your account settings and categories
            </p>
          </div>
        </div>
      </div>
      {/* end header */}

      <div className="container flex flex-col gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Currency</CardTitle>
            <CardDescription>
              Set your default currency for transaction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrencyComboBox />
          </CardContent>
        </Card>
        <CategoryList type="income" />
        <CategoryList type="expanse" />
      </div>
    </>
  );
}

export default page;

function CategoryList({ type }: { type: TransactionType }) {
  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });
  return (
    <SkeletonWrapper isLoading={categoriesQuery.isFetching}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {type === "expanse" ? (
                <TrendingDown className="w-12 h-12 items-center rounded-lg p-2 text-red-500 bg-red-400/10" />
              ) : (
                <TrendingUp className="w-12 h-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10" />
              )}
            </div>
            <div>
              {type === "income" ? "Incomes" : "Expanse"} categories
              <div className="text-sm text-muted-foreground">
                Sorted by name
              </div>
            </div>
            <CreateCategoryDialog
              type={type}
              SuccessCallback={() => categoriesQuery.refetch()}
            />
          </CardTitle>
        </CardHeader>
      </Card>
    </SkeletonWrapper>
  );
}
