import type { Category } from "@/types/types";

export type CategoryProps = {
  refetchCategories: () => void;
  category: Category;
};
