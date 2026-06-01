import type { Category } from "@/types/types";

export type NewCategoryProps = {
  isOpen: boolean;
  category?: Category;
  onOpenChange: (open: boolean) => void;
  refetchCategories?: () => void;
};

export type CategoryFormData = {
  title: string;
  description?: string;
};

export type CategoryInput = CategoryFormData & {
  icon: string;
  color: string;
};

export type CategoryOutput = Category;
