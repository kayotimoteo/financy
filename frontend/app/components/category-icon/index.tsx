import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusiness,
  CarFront,
  Dumbbell,
  Gift,
  HeartPulse,
  House,
  ImageOff,
  Mailbox,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
} from "lucide-react";
import type { CategoryIconProps } from "./types";
import type { ReactNode } from "react";

export const CategoryIcon: React.FC<CategoryIconProps> = ({ color, icon }) => {
  const colors = {
    red: "bg-red-light text-red-base",
    blue: "bg-blue-light text-blue-base",
    green: "bg-green-light text-green-base",
    yellow: "bg-yellow-light text-yellow-base",
    purple: "bg-purple-light text-purple-base",
    pink: "bg-pink-light text-pink-base",
    orange: "bg-orange-light text-orange-base",
  } as Record<string, string>;

  const icons = {
    BriefcaseBusiness: <BriefcaseBusiness className="w-4 h-4" />,
    CarFront: <CarFront className="w-4 h-4" />,
    HeartPulse: <HeartPulse className="w-4 h-4" />,
    PiggyBank: <PiggyBank className="w-4 h-4" />,
    ShoppingCart: <ShoppingCart className="w-4 h-4" />,
    Ticket: <Ticket className="w-4 h-4" />,
    ToolCase: <ToolCase className="w-4 h-4" />,
    Utensils: <Utensils className="w-4 h-4" />,
    PawPrint: <PawPrint className="w-4 h-4" />,
    House: <House className="w-4 h-4" />,
    Gift: <Gift className="w-4 h-4" />,
    Dumbbell: <Dumbbell className="w-4 h-4" />,
    BookOpen: <BookOpen className="w-4 h-4" />,
    BaggageClaim: <BaggageClaim className="w-4 h-4" />,
    Mailbox: <Mailbox className="w-4 h-4" />,
    ReceiptText: <ReceiptText className="w-4 h-4" />,
  } as Record<string, ReactNode>;

  const colorConfig = colors[color] ?? "bg-gray-100 text-gray-600";
  const iconConfig = icons[icon] ?? <ImageOff className="w-4 h-4" />;

  return (
    <div
      className={`w-10 h-10 flex flex-row items-center justify-center rounded-lg ${colorConfig}`}
    >
      {iconConfig}
    </div>
  );
};
