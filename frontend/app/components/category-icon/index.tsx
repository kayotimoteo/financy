import {
  getCategoryColorOption,
  getCategoryIconOption,
} from "@/constants/category-options";
import { ImageOff } from "lucide-react";
import type { CategoryIconProps } from "./types";

export const CategoryIcon = ({ color, icon }: CategoryIconProps) => {
  const colorConfig =
    getCategoryColorOption(color)?.iconClassName ?? "bg-gray-100 text-gray-600";
  const Icon = getCategoryIconOption(icon)?.Icon;

  return (
    <div
      className={`w-10 h-10 flex flex-row items-center justify-center rounded-lg ${colorConfig}`}
    >
      {Icon ? <Icon className="w-4 h-4" /> : <ImageOff className="w-4 h-4" />}
    </div>
  );
};
