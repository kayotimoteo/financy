import React from "react";
import type { CategoryLabelProps } from "./types";

export const CategoryLabel: React.FC<CategoryLabelProps> = ({
  name,
  color,
}) => {
  const colors = {
    red: "bg-red-light text-red-dark",
    blue: "bg-blue-light text-blue-dark",
    green: "bg-green-light text-green-dark",
    yellow: "bg-yellow-light text-yellow-dark",
    purple: "bg-purple-light text-purple-dark",
    pink: "bg-pink-light text-pink-dark",
    orange: "bg-orange-light text-orange-dark",
  } as Record<string, string>;

  const colorConfig = colors[color] ?? "bg-gray-100 text-gray-600";

  return (
    <div className={`w-fit rounded-full ${colorConfig} px-3 py-1`}>
      <p className="text-sm font-medium">{name}</p>
    </div>
  );
};
