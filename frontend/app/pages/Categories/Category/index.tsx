import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";
import type { CategoryProps } from "./types";
import { CategoryLabel } from "@/components/category-label";
import { CategoryIcon } from "@/components/category-icon";
import { useMutation } from "@apollo/client/react";
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/Category";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { CreateEditCategory } from "@/components/create-edit-category";
import { refetchQueries, updateQueries } from "@/utils/updateRefetchQueries";

export const Category: React.FC<CategoryProps> = ({
  category,
  refetchCategories,
}) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const { id, title, description, countTransactions, color, icon } = category;

  const [deleteCategory, { loading }] = useMutation<
    { deleteCategory: boolean },
    { id: string }
  >(DELETE_CATEGORY, {
    refetchQueries: refetchQueries(),
    update(cache) {
      updateQueries(cache);
    },
    onCompleted: () => {
      toast.success("Categoria deletada com sucesso!");
      refetchCategories();
    },
    onError: (error) => {
      const err = error.message;

      toast.error(
        <>
          <p>Erro ao deletar categoria!</p>
          {err && <p>Error: {err}</p>}
        </>,
      );
    },
  });

  const handleDelete = () => {
    deleteCategory({ variables: { id } });
  };

  return (
    <Card className="w-full min-h-56.5 gap-5 p-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CategoryIcon color={color} icon={icon} />

        <div className="flex flex-row items-center gap-2">
          <Button
            variant="outline"
            onClick={handleDelete}
            disabled={loading}
            className="p-2!"
          >
            <Trash className="text-danger" />
          </Button>

          <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="p-2!">
                <Pencil />
              </Button>
            </DialogTrigger>

            <CreateEditCategory
              isOpen={openEditDialog}
              onOpenChange={setOpenEditDialog}
              refetchCategories={() => refetchCategories()}
              category={category}
            />
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="h-full">
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>

        <p
          title={description}
          className="text-sm font-normal text-gray-600 line-clamp-2"
        >
          {description}
        </p>
      </CardContent>

      <CardFooter className="flex flex-row items-center justify-between">
        <CategoryLabel name={title} color={color} />

        <p className="text-sm font-normal text-gray-600">
          {countTransactions} {countTransactions === 1 ? "item" : "itens"}
        </p>
      </CardFooter>
    </Card>
  );
};
