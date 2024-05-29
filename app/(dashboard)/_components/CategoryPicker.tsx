"use client";

import { TransactionType } from "@/lib/types";
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Props {
  type: TransactionType;
}

function CategoryPicker({ type }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const selectedCategory = categoriesQuery.data?.find(
    (category: Category) => category.name === value
  );

  return <div></div>;
}

export default CategoryPicker;
