import { Card as CardContainer, CardContent } from "@/components/ui/card";
import type { CardProps } from "./types";
import { Skeleton } from "@/components/ui/skeleton";

export const Card = ({ icon, title, value, isLoading, isError }: CardProps) => {
  const formattedValue = value?.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <CardContainer className="w-full p-6!">
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3">
          {icon}
          <p className="text-xs font-medium text-gray-500 uppercase">{title}</p>
        </div>

        <h2 className="text-[1.75rem] font-bold text-gray-800">
          {isLoading ? (
            <Skeleton className="h-10.5 w-[80%] min-w-24" />
          ) : isError ? (
            "-"
          ) : (
            formattedValue
          )}
        </h2>
      </CardContent>
    </CardContainer>
  );
};
