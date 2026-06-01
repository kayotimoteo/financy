import { getCategoryColorOption } from "@/constants/category-options";
import type { CategoryLabelProps } from "./types";

export const CategoryLabel = ({ name, color }: CategoryLabelProps) => {
  const colorConfig =
    getCategoryColorOption(color)?.labelClassName ?? "bg-gray-100 text-gray-600";

  return (
    <div className={`w-fit rounded-full ${colorConfig} px-3 py-1`}>
      <p className="text-sm font-medium">{name}</p>
    </div>
  );
};
