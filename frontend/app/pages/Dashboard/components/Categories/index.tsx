import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { CategoryRow } from "../CategoryRow";
import { useNavigate } from "react-router-dom";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category";
import type { Category } from "@/types/types";
import { useQuery } from "@apollo/client/react";

export const Categories = () => {
  const navigate = useNavigate();

  const { data, loading, error } = useQuery<{
    listAllCategories: Category[];
  }>(LIST_CATEGORIES);

  const handleManageCategories = () => {
    navigate("/categories");
  };

  const categories = data?.listAllCategories || [];

  return (
    <Card className="h-fit p-0! gap-0!">
      <div className="flex flex-row items-center justify-between border-b border-gray-200 py-5 pl-6 pr-3">
        <p className="text-xs font-medium text-gray-500 uppercase">
          Categorias
        </p>

        <Button variant="link" onClick={handleManageCategories}>
          Gerenciar <ChevronRight />
        </Button>
      </div>

      <div className="p-6">
        {categories.length ? (
          <table className="w-full">
            <tbody>
              {categories.map((category) => (
                <CategoryRow key={category.id} category={category} />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="w-full h-60 content-center text-center text-gray-700">
            {loading
              ? "Carregando..."
              : error
                ? "Erro ao carregar categorias"
                : "Crie uma categoria para começar"}
          </p>
        )}
      </div>
    </Card>
  );
};
