import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Cards } from "./Cards";
import { Category } from "./Category";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateEditCategory } from "@/components/create-edit-category";
import { useQuery } from "@apollo/client/react";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category";
import type { Category as CategoryProps } from "@/types/types";

export const Categories = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const { data, loading, refetch, error } = useQuery<{
    listAllCategories: CategoryProps[];
  }>(LIST_CATEGORIES);

  const categories = data?.listAllCategories || [];

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h2 className="font-bold text-2xl text-gray-800">Categorias</h2>
          <p className="text-base text-gray-600">
            Organize suas transações por categorias
          </p>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus />
              Nova categoria
            </Button>
          </DialogTrigger>

          <CreateEditCategory
            isOpen={openDialog}
            onOpenChange={setOpenDialog}
            refetchCategories={() => refetch()}
          />
        </Dialog>
      </div>

      <Cards />

      {loading || error || !categories.length ? (
        <p className="w-full h-60 content-center text-center text-gray-700 bg-white border border-gray-200 rounded-xl">
          {loading
            ? "Carregando..."
            : error
              ? "Erro ao carregar categorias"
              : "Crie uma categoria para começar"}
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {categories.map((category) => (
            <Category
              key={category.id}
              category={category}
              refetchCategories={() => refetch()}
            />
          ))}
        </div>
      )}
    </div>
  );
};
