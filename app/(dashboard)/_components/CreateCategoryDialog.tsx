"use client";
import { TransactionType } from "@/lib/types";
import React, { useState } from "react";

interface Props {
  type: TransactionType;
}
function CreateCategoryDialog({ type }: Props) {
  const [open, setOpen] = useState(false);

  return <div></div>;
}

export default CreateCategoryDialog;
