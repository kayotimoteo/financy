import {
  defaultCategoryColor,
  defaultCategoryIcon,
} from "@/constants/category-options";
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
} from "@/lib/graphql/mutations/Category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client/react";
import { Loader, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  InputGroup,
  InputGroupControl,
  InputGroupInput,
} from "../ui/input-group";
import { Label } from "../ui/label";
import { ColorSelector } from "./ColorSelector";
import { IconSelector } from "./IconSelector";
import type {
  CategoryFormData,
  CategoryInput,
  CategoryOutput,
  NewCategoryProps,
} from "./types";

const categorySchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().optional(),
});

/**
 * Dialog content used to create or edit a category with form validation.
 */
export const CreateEditCategory = ({
  isOpen,
  onOpenChange,
  refetchCategories,
  category,
}: NewCategoryProps) => {
  const [color, setColor] = useState(defaultCategoryColor);
  const [icon, setIcon] = useState(defaultCategoryIcon);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const resetFields = () => {
    reset();
    setColor(defaultCategoryColor);
    setIcon(defaultCategoryIcon);
  };

  const closeDialog = () => {
    resetFields();
    onOpenChange(false);
    refetchCategories?.();
  };

  const [createCategory, { loading: loadingCreate }] = useMutation<
    { createCategory: CategoryOutput },
    { data: CategoryInput }
  >(CREATE_CATEGORY, {
    refetchQueries: ["SummaryCategory"],
    onCompleted: () => {
      toast.success("Categoria criada com sucesso!");
      closeDialog();
    },
    onError: (error) => {
      toast.error(
        <>
          <p>Erro ao criar categoria!</p>
          {error.message && <p>Error: {error.message}</p>}
        </>,
      );
    },
  });

  const [updateCategory, { loading: loadingUpdate }] = useMutation<
    { updateCategory: CategoryOutput },
    { data: CategoryInput; id: string }
  >(UPDATE_CATEGORY, {
    refetchQueries: ["SummaryCategory"],
    onCompleted: () => {
      toast.success("Categoria atualizada com sucesso!");
      closeDialog();
    },
    onError: (error) => {
      toast.error(
        <>
          <p>Erro ao atualizar a categoria!</p>
          {error.message && <p>Error: {error.message}</p>}
        </>,
      );
    },
  });

  const onSubmit = async (formData: CategoryFormData) => {
    const data = {
      ...formData,
      icon,
      color,
    };

    if (category) {
      updateCategory({ variables: { data, id: category.id } });
      return;
    }

    createCategory({ variables: { data } });
  };

  useEffect(() => {
    if (!isOpen) {
      resetFields();
      return;
    }

    if (category) {
      setValue("title", category.title);
      setValue("description", category.description);
      setColor(category.color);
      setIcon(category.icon);
    }
  }, [isOpen, category, setValue]);

  const loading = loadingCreate || loadingUpdate;

  return (
    <DialogContent showCloseButton={false} className="w-md gap-6">
      <DialogHeader className="flex flex-row items-start justify-between">
        <div className="flex flex-col gap-0.5">
          <DialogTitle>
            {category ? "Editar categoria" : "Nova categoria"}
          </DialogTitle>
          <DialogDescription>
            Organize suas transações com categorias
          </DialogDescription>
        </div>

        <DialogClose asChild>
          <Button variant="outline" className="p-2!">
            <X />
          </Button>
        </DialogClose>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputGroupControl>
          <Label htmlFor="title">Título</Label>
          <InputGroup>
            <InputGroupInput
              id="title"
              type="text"
              placeholder="Ex. Alimentação"
              {...register("title")}
            />
          </InputGroup>

          {errors.title && (
            <span className="text-xs text-danger">{errors.title.message}</span>
          )}
        </InputGroupControl>

        <InputGroupControl>
          <Label htmlFor="description">Descrição</Label>
          <InputGroup>
            <InputGroupInput
              id="description"
              type="text"
              placeholder="Descrição da categoria"
              {...register("description")}
            />
          </InputGroup>

          <span className="text-xs text-gray-500">Opcional</span>
        </InputGroupControl>

        <IconSelector value={icon} onChange={setIcon} />
        <ColorSelector value={color} onChange={setColor} />

        <Button variant="default" disabled={loading} className="mt-2">
          Salvar
          {loading && <Loader className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </DialogContent>
  );
};
