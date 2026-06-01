import { CategoryLabel } from "@/components/category-label";
import type { CategoryRowProps } from "./types";

export const CategoryRow: React.FC<CategoryRowProps> = ({ category }) => {
  const formattedValue = category.totalAmount?.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <tr className="not-first:[&>td]:pt-5">
      <td width="60%">
        <CategoryLabel name={category.title} color={category.color} />
      </td>

      <td width="20%">
        <p className="text-sm font-normal text-gray-600">
          {category.countTransactions}{" "}
          {category.countTransactions === 1 ? "item" : "itens"}
        </p>
      </td>

      <td width="20%">
        <p className="text-sm font-semibold text-gray-800">{formattedValue}</p>
      </td>
    </tr>
  );
};
