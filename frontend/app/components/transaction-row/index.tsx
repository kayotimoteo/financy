import { CircleArrowDown, CircleArrowUp, SquarePen, Trash } from "lucide-react";
import type { TransactionRowProps } from "./types";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { CategoryLabel } from "../category-label";
import { CategoryIcon } from "../category-icon";
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/Transaction";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { CreateEditTransaction } from "../create-edit-transaction";
import { refetchQueries, updateQueries } from "@/utils/updateRefetchQueries";

export const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
}) => {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const { description, date, category, type, amount, id } = transaction;

  const { pathname } = useLocation();

  const [deleteTransaction, { loading: deleteLoading }] = useMutation<
    { deleteTransaction: boolean },
    { id: string }
  >(DELETE_TRANSACTION, {
    refetchQueries: refetchQueries(),
    update(cache) {
      updateQueries(cache);
    },
    onCompleted: () => {
      toast.success("Transação deletada com sucesso!");
    },
    onError: (error) => {
      const err = error.message;

      toast.error(
        <>
          <p>Erro ao deletar transação!</p>
          {err && <p>Error: {err}</p>}
        </>,
      );
    },
  });

  const handleDelete = () => {
    deleteTransaction({ variables: { id } });
  };

  const isIncome = type === "income";
  const isTransactionsPage = pathname === "/transactions";

  const formattedValue = amount?.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  const loading = deleteLoading;

  return (
    <tr className="h-20 border-t border-gray-200">
      <td width="80%">
        <div className="flex flex-row items-center gap-4 px-6">
          <CategoryIcon
            color={category?.color ?? "gray"}
            icon={category?.icon ?? "circle"}
          />

          <div className="flex flex-col gap-0.5">
            <p className="text-base font-medium text-gray-800">{description}</p>

            {!isTransactionsPage && (
              <p className="text-sm font-normal text-gray-600">
                {formattedDate}
              </p>
            )}
          </div>
        </div>
      </td>

      {isTransactionsPage && (
        <td className="px-6">
          <p className="text-sm font-normal text-gray-600">{formattedDate}</p>
        </td>
      )}

      <td className="px-6 justify-items-center">
        <CategoryLabel
          name={category?.title ?? "-"}
          color={category?.color ?? "gray"}
        />
      </td>

      {isTransactionsPage ? (
        <td className="justify-items-center">
          <div className="flex flex-row items-center gap-2 px-6">
            {isIncome ? (
              <CircleArrowUp className="w-4 h-4 text-brand-base" />
            ) : (
              <CircleArrowDown className="w-4 h-4 text-red-base" />
            )}

            <p
              className={`text-sm font-semibold text-gray-800 ${isIncome ? "text-green-dark" : "text-red-dark"}`}
            >
              {isIncome ? "Entrada" : "Saída"}
            </p>
          </div>
        </td>
      ) : (
        <td width="20%">
          <div className="flex flex-row items-center gap-2 px-6 justify-end">
            <p className="flex-1 text-sm text-right font-semibold text-gray-800 truncate">
              {isIncome ? "+" : "-"} {formattedValue}
            </p>

            {isIncome ? (
              <CircleArrowUp className="w-4 h-4 text-brand-base" />
            ) : (
              <CircleArrowDown className="w-4 h-4 text-red-base" />
            )}
          </div>
        </td>
      )}

      {isTransactionsPage && (
        <>
          <td width="20%" className="px-6">
            <p className="text-sm text-right font-semibold text-gray-800 truncate">
              {isIncome ? "+" : "-"} {formattedValue}
            </p>
          </td>

          <td>
            <div className="flex flex-row items-center gap-2 px-6">
              <Button
                variant="outline"
                onClick={handleDelete}
                disabled={loading}
                className="p-2!"
              >
                <Trash className="w-4 h-4 text-danger" />
              </Button>

              <Dialog
                open={openUpdateDialog}
                onOpenChange={setOpenUpdateDialog}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" disabled={loading} className="p-2!">
                    <SquarePen className="w-4 h-4" />
                  </Button>
                </DialogTrigger>

                <CreateEditTransaction
                  transaction={transaction}
                  isOpen={openUpdateDialog}
                  onOpenChange={setOpenUpdateDialog}
                />
              </Dialog>
            </div>
          </td>
        </>
      )}
    </tr>
  );
};
