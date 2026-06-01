import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusiness,
  CarFront,
  Dumbbell,
  Gift,
  HeartPulse,
  House,
  Mailbox,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const defaultCategoryIcon = "BriefcaseBusiness";
export const defaultCategoryColor = "green";

export const categoryIcons = [
  { value: "BriefcaseBusiness", label: "Trabalho", Icon: BriefcaseBusiness },
  { value: "CarFront", label: "Transporte", Icon: CarFront },
  { value: "HeartPulse", label: "Saúde", Icon: HeartPulse },
  { value: "PiggyBank", label: "Investimentos", Icon: PiggyBank },
  { value: "ShoppingCart", label: "Compras", Icon: ShoppingCart },
  { value: "Ticket", label: "Lazer", Icon: Ticket },
  { value: "ToolCase", label: "Serviços", Icon: ToolCase },
  { value: "Utensils", label: "Alimentação", Icon: Utensils },
  { value: "PawPrint", label: "Pets", Icon: PawPrint },
  { value: "House", label: "Casa", Icon: House },
  { value: "Gift", label: "Presentes", Icon: Gift },
  { value: "Dumbbell", label: "Academia", Icon: Dumbbell },
  { value: "BookOpen", label: "Educação", Icon: BookOpen },
  { value: "BaggageClaim", label: "Viagem", Icon: BaggageClaim },
  { value: "Mailbox", label: "Correspondência", Icon: Mailbox },
  { value: "ReceiptText", label: "Contas", Icon: ReceiptText },
] as const satisfies ReadonlyArray<{
  value: string;
  label: string;
  Icon: IconComponent;
}>;

export const categoryColors = [
  {
    value: "green",
    label: "Verde",
    swatchClassName: "bg-green-base",
    iconClassName: "bg-green-light text-green-base",
    labelClassName: "bg-green-light text-green-dark",
  },
  {
    value: "blue",
    label: "Azul",
    swatchClassName: "bg-blue-base",
    iconClassName: "bg-blue-light text-blue-base",
    labelClassName: "bg-blue-light text-blue-dark",
  },
  {
    value: "purple",
    label: "Roxo",
    swatchClassName: "bg-purple-base",
    iconClassName: "bg-purple-light text-purple-base",
    labelClassName: "bg-purple-light text-purple-dark",
  },
  {
    value: "pink",
    label: "Rosa",
    swatchClassName: "bg-pink-base",
    iconClassName: "bg-pink-light text-pink-base",
    labelClassName: "bg-pink-light text-pink-dark",
  },
  {
    value: "red",
    label: "Vermelho",
    swatchClassName: "bg-red-base",
    iconClassName: "bg-red-light text-red-base",
    labelClassName: "bg-red-light text-red-dark",
  },
  {
    value: "orange",
    label: "Laranja",
    swatchClassName: "bg-orange-base",
    iconClassName: "bg-orange-light text-orange-base",
    labelClassName: "bg-orange-light text-orange-dark",
  },
  {
    value: "yellow",
    label: "Amarelo",
    swatchClassName: "bg-yellow-base",
    iconClassName: "bg-yellow-light text-yellow-base",
    labelClassName: "bg-yellow-light text-yellow-dark",
  },
] as const;

export const getCategoryIconOption = (icon: string) =>
  categoryIcons.find((option) => option.value === icon);

export const getCategoryColorOption = (color: string) =>
  categoryColors.find((option) => option.value === color);
