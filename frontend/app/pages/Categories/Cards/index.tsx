import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SUMMARY_CATEGORY } from "@/lib/graphql/queries/Category";
import { SUMMARY_TRANSACTION } from "@/lib/graphql/queries/Transaction";
import type { SummaryCategory, SummaryTransaction } from "@/types/types";
import { useQuery } from "@apollo/client/react";
import { ArrowUpDown, Tag, Utensils } from "lucide-react";

export const Cards = () => {
  const {
    data: summaryCategoryData,
    loading: loadingSummaryCategory,
    error: errorSummaryCategory,
  } = useQuery<{
    summaryCategory: SummaryCategory;
  }>(SUMMARY_CATEGORY);

  const {
    data: summaryTransactionData,
    loading: loadingSummaryTransaction,
    error: errorSummaryTransaction,
  } = useQuery<{
    summaryTransaction: SummaryTransaction;
  }>(SUMMARY_TRANSACTION);

  const summaryCategory = summaryCategoryData?.summaryCategory;
  const summaryTransaction = summaryTransactionData?.summaryTransaction;

  return (
    <div className="flex flex-row gap-6">
      <Card className="w-full p-6!">
        <CardContent className="flex flex-row gap-4">
          <div className="w-8 h-8 flex justify-center items-center pt-1.5">
            <Tag className="w-6 h-6 text-gray-700" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-[1.75rem] font-bold text-gray-800">
              {loadingSummaryCategory ? (
                <Skeleton className="h-10.5 w-[80%] min-w-24" />
              ) : errorSummaryCategory ? (
                "-"
              ) : (
                summaryCategory?.totalCategories
              )}
            </h2>

            <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.6px]">
              Total de categorias
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full p-6!">
        <CardContent className="flex flex-row gap-4">
          <div className="w-8 h-8 flex justify-center items-center pt-1.5">
            <ArrowUpDown className="w-6 h-6 text-purple-base" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-[1.75rem] font-bold text-gray-800">
              {loadingSummaryTransaction ? (
                <Skeleton className="h-10.5 w-[80%] min-w-24" />
              ) : errorSummaryTransaction ? (
                "-"
              ) : (
                summaryTransaction?.totalTransactions
              )}
            </h2>

            <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.6px]">
              Total de transações
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full p-6!">
        <CardContent className="flex flex-row gap-4">
          <div className="w-8 h-8 flex justify-center items-center pt-1.5">
            <Utensils className="w-6 h-6 text-blue-base" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-[1.75rem] font-bold text-gray-800">
              {loadingSummaryCategory ? (
                <Skeleton className="h-10.5 w-[80%] min-w-24" />
              ) : errorSummaryCategory ? (
                "-"
              ) : (
                summaryCategory?.mostUsedCategory
              )}
            </h2>

            <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.6px]">
              Categoria mais utilizada
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
