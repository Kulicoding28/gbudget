"use client";

import { Category } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { DeleteCategory } from "../_actions/categories";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDescription } from "@/components/ui/alert";
import { TransactionType } from "@/lib/types";

interface Props {
  trigger: ReactNode;
  category: Category;
}
function DeleteCategoryDialog({ category, trigger }: Props) {
  const categoryIdentifier = `${category.name}-${category.type}`;
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: DeleteCategory,
    onSuccess: async () => {
      toast.success("Category deleted successfully🥳", {
        id: categoryIdentifier,
      });

      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: () => {
      toast.error("Failed to delete category", {
        id: categoryIdentifier,
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are You Sure ?</AlertDialogTitle>
          <AlertDescription>
            This Action cannot be undone. This will permanently delete your
            category
          </AlertDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast.loading("Deleting category...", {
                id: categoryIdentifier,
              });
              deleteMutation.mutate({
                name: category.name,
                type: category.type as TransactionType,
              });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCategoryDialog;
