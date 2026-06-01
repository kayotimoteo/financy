import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TransactionRow } from "@/components/transaction-row";
import { ChevronRight, CircleX, Loader, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateEditTransaction } from "@/components/create-edit-transaction";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transaction";
import type { ListTransactions } from "@/types/types";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";

export const RecentTransactions = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const { data, loading, error } = useQuery<{
    listTransactions: ListTransactions;
  }>(LIST_TRANSACTIONS, {
    variables: {
      data: {
        limit: 5,
        offset: 0,
      },
    },
  });

  const navigate = useNavigate();

  const handleSeeAllTransactions = () => {
    navigate("/transactions");
  };

  const transactions = data?.listTransactions.transactions || [];

  return (
    <div className="col-span-2">
      <Card className="p-0! gap-0!">
        <div className="flex flex-row items-center justify-between py-5 pl-6 pr-3">
          <p className="text-xs font-medium text-gray-500 uppercase">
            Transações recentes
          </p>

          <Button variant="link" onClick={handleSeeAllTransactions}>
            Ver todas <ChevronRight />
          </Button>
        </div>

        {!transactions.length ? (
          <div className="flex flex-col items-center justify-center py-15 gap-4 border-t border-gray-200">
            {error && <CircleX className="w-10 h-10 text-danger" />}
            {loading && <Loader className="ml-2 h-5 w-5 animate-spin" />}

            <p className="text-gray-600 text-center">
              {error
                ? "Erro ao carregar as transações"
                : loading
                  ? "Carregando..."
                  : "Nenhuma transação"}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <tbody>
              {transactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </tbody>
          </table>
        )}

        <div className="w-full flex flex-row items-center justify-center py-5 px-6 border-t border-gray-200">
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button variant="link">
                <Plus /> Nova transação
              </Button>
            </DialogTrigger>

            <CreateEditTransaction
              isOpen={openDialog}
              onOpenChange={setOpenDialog}
            />
          </Dialog>
        </div>
      </Card>
    </div>
  );
};
