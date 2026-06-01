import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusiness,
  CarFront,
  Dumbbell,
  Gift,
  HeartPulse,
  House,
  Loader,
  Mailbox,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
  X,
} from "lucide-react";
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
import { useForm } from "react-hook-form";
import type {
  CategoryFormData,
  CategoryInput,
  CategoryOutput,
  NewCategoryProps,
} from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
} from "@/lib/graphql/mutations/Category";
import { toast } from "sonner";
import { useMutation } from "@apollo/client/react";

const categorySchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().optional(),
});

export const CreateEditCategory = ({
  isOpen,
  onOpenChange,
  refetchCategories,
  category,
}: NewCategoryProps) => {
  const [color, setColor] = useState("green");
  const [icon, setIcon] = useState("BriefcaseBusiness");

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
    setColor("green");
    setIcon("BriefcaseBusiness");
  };

  const [createCategory, { loading: loadingCreate }] = useMutation<
    { createCategory: CategoryOutput },
    { data: CategoryInput }
  >(CREATE_CATEGORY, {
    refetchQueries: ["SummaryCategory"],
    onCompleted: () => {
      toast.success("Categoria criada com sucesso!");
      resetFields();
      onOpenChange(false);
      refetchCategories?.();
    },
    onError: (error) => {
      const err = error.message;

      toast.error(
        <>
          <p>Erro ao criar categoria!</p>
          {err && <p>Error: {err}</p>}
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
      resetFields();
      onOpenChange(false);
      refetchCategories?.();
    },
    onError: (error) => {
      const err = error.message;

      toast.error(
        <>
          <p>Erro ao atualizar a categoria!</p>
          {err && <p>Error: {err}</p>}
        </>,
      );
    },
  });

  const handleColor = (option: string) => {
    setColor(option);
  };

  const handleIcon = (option: string) => {
    setIcon(option);
  };

  const onSubmit = async (formData: CategoryFormData) => {
    if (category) {
      updateCategory({
        variables: {
          data: {
            ...formData,
            icon,
            color,
          },
          id: category.id,
        },
      });
    } else {
      createCategory({
        variables: {
          data: {
            ...formData,
            icon,
            color,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (!isOpen) {
      resetFields();
    } else {
      if (category) {
        setValue("title", category.title);
        setValue("description", category.description);
        setColor(category.color);
        setIcon(category.icon);
      }
    }
  }, [isOpen, category]);

  const selectedIconClassName =
    "border-brand-base [&_svg]:text-gray-600 bg-gray-100";
  const selectedColorClassName = "border-brand-base bg-gray-100";

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

        <div className="flex flex-col gap-2">
          <Label className="font-medium">Ícone</Label>

          <div className="flex flex-row flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleIcon("BriefcaseBusiness")}
              className={`w-10.5 h-10.5 p-0! [&_svg]:w-5! [&_svg]:h-5! [&_svg]:text-gray-500 ${icon === "BriefcaseBusiness" && selectedIconClassName}`}
            >
              <BriefcaseBusiness />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleIcon("CarFront")}
              className={`w-10.5 h-10.5 p-0! [&_svg]:w-5! [&_svg]:h-5! [&_svg]:text-gray-500 ${icon === "CarFront" && selectedIconClassName}`}
            >
              <CarFront />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleIcon("HeartPulse")}
              className={`w-10.5 h-10.5 p-0! [&_svg]:w-5! [&_svg]:h-5! [&_svg]:text-gray-500 ${icon === "HeartPulse" && selectedIconClassName}`}
            >
              <HeartPulse />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleIcon("PiggyBank")}
              className={`w-10.5 h-10.5 p-0! [&_svg]:w-5! [&_svg]:h-5! [&_svg]:text-gray-500 ${icon === "PiggyBank" && selectedIconClassName}`}
            >
              <PiggyBank />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleIcon("ShoppingCart")}
              className={`w-10.5 h-10.5 p-0! [&_svg]:w-5! [&_svg]:h-5! [&_svg]:text-gray-500 ${icon === "ShoppingCart" && selectedIconClassName}`}
            >
              <ShoppingCart />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleIcon("Ticket")}
              className={`w-10.5 h-10.5 p-0! [&_svg]:w-5! [&_svg]:h-5! [&_svg]:text-gray-500 ${icon === "Ticket" && selectedIconClassName}`}
            >
              <Ticket />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleIcon("ToolCase")}
              className={`w-10.5 h-10.5 p-0! [&_svg]:w-5! [&_svg]:h-5! [&_svg]:text-gray-500 ${icon === "ToolCase" && selectedIconClassName}`}
            >
              <ToolCase />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleIcon("Utensils")}
              className={`w-10.5 h-10.5 p-0! [&_svg]:w-5! [&_svg]:h-5! [&_svg]:text-gray-500 ${icon === "Utensils" && selectedIconClassName}`}
            >
              <Utensils />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleIcon("PawPrint")}
              className={`w-10.5 h-10.5 p-0! [&_svg]:w-5! [&_svg]:h-5! [&_svg]:text-gray-500 ${icon === "PawPrint" && selectedIconClassName}`}
            >
              <PawPrint />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleIcon("House")}
              className={`w-10.5 h-10.5 p-0! [&_svg]:w-5! [&_svg]:h-5! [&_svg]:text-gray-500 ${icon === "House" && selectedIconClassName}`}
            >
              <House />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleIcon("Gift")}
              className={`w-10.5 h-10.5 p-0! [&_svg]:w-5! [&_svg]:h-5! [&_svg]:text-gray-500 ${icon === "Gift" && selectedIconClassName}`}
            >
              <Gift />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleIcon("Dumbbell")}
              className={`w-10.5 h-10.5 p-0! [&_svg]:w-5! [&_svg]:h-5! [&_svg]:text-gray-500 ${icon === "Dumbbell" && selectedIconClassName}`}
            >
              <Dumbbell />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleIcon("BookOpen")}
              className={`w-10.5 h-10.5 p-0! [&_svg]:w-5! [&_svg]:h-5! [&_svg]:text-gray-500 ${icon === "BookOpen" && selectedIconClassName}`}
            >
              <BookOpen />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleIcon("BaggageClaim")}
              className={`w-10.5 h-10.5 p-0! [&_svg]:w-5! [&_svg]:h-5! [&_svg]:text-gray-500 ${icon === "BaggageClaim" && selectedIconClassName}`}
            >
              <BaggageClaim />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleIcon("Mailbox")}
              className={`w-10.5 h-10.5 p-0! [&_svg]:w-5! [&_svg]:h-5! [&_svg]:text-gray-500 ${icon === "Mailbox" && selectedIconClassName}`}
            >
              <Mailbox />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleIcon("ReceiptText")}
              className={`w-10.5 h-10.5 p-0! [&_svg]:w-5! [&_svg]:h-5! [&_svg]:text-gray-500 ${icon === "ReceiptText" && selectedIconClassName}`}
            >
              <ReceiptText />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="font-medium">Cor</Label>

          <div className="flex flex-row flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleColor("green")}
              className={`p-1! ${color === "green" && selectedColorClassName}`}
            >
              <div className="w-10 h-5 rounded-sm bg-green-base" />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleColor("blue")}
              className={`p-1! ${color === "blue" && selectedColorClassName}`}
            >
              <div className="w-10 h-5 rounded-sm bg-blue-base" />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleColor("purple")}
              className={`p-1! ${color === "purple" && selectedColorClassName}`}
            >
              <div className="w-10 h-5 rounded-sm bg-purple-base" />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleColor("pink")}
              className={`p-1! ${color === "pink" && selectedColorClassName}`}
            >
              <div className="w-10 h-5 rounded-sm bg-pink-base" />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleColor("red")}
              className={`p-1! ${color === "red" && selectedColorClassName}`}
            >
              <div className="w-10 h-5 rounded-sm bg-red-base" />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleColor("orange")}
              className={`p-1! ${color === "orange" && selectedColorClassName}`}
            >
              <div className="w-10 h-5 rounded-sm bg-orange-base" />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleColor("yellow")}
              className={`p-1! ${color === "yellow" && selectedColorClassName}`}
            >
              <div className="w-10 h-5 rounded-sm bg-yellow-base" />
            </Button>
          </div>
        </div>

        <Button variant="default" disabled={loading} className="mt-2">
          Salvar
          {loading && <Loader className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </DialogContent>
  );
};
