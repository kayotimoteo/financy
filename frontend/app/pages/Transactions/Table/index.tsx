import { TransactionRow } from "@/components/transaction-row";
import { Button } from "@/components/ui/button";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transaction";
import type { ListTransactions } from "@/types/types";
import { useQuery } from "@apollo/client/react";
import { ChevronLeft, ChevronRight, CircleX, Loader } from "lucide-react";
import { useState } from "react";
import { useTransactionsStore } from "@/store/transactions/transactions";

export const Table = () => {
  const [page, setPage] = useState(1);

  const filters = useTransactionsStore((state) => state.filters);

  const { data, loading, error } = useQuery<{
    listTransactions: ListTransactions;
  }>(LIST_TRANSACTIONS, {
    variables: {
      data: {
        limit: 10,
        offset: (page - 1) * 10,
        search: filters.search,
        type: filters.type === "all" ? undefined : filters.type,
        categoryId:
          filters.categoryId === "all" ? undefined : filters.categoryId,
        startDate: filters.period?.from,
        endDate: filters.period?.to,
      },
    },
  });

  const transactions = data?.listTransactions.transactions || [];
  const total = data?.listTransactions.total || 0;

  const quantityPages = Math.ceil(total / 10);

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl">
      {!transactions.length ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
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
        <>
          <table>
            <thead className="text-gray-500 font-medium text-xs uppercase tracking-[0.6px] [&_th]:py-5 [&_th]:px-6">
              <tr>
                <th className="text-left">Descrição</th>
                <th className="text-center">Data</th>
                <th className="text-center">Categoria</th>
                <th className="text-center">Tipo</th>
                <th className="text-right">Valor</th>
                <th className="text-right">Ações</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </tbody>
          </table>
          <div className="flex flex-row items-center justify-between py-5 px-6 border-t border-gray-200">
            <p className="text-sm font-normal text-gray-700">
              <span className="font-medium">{(page - 1) * 10 + 1}</span> a{" "}
              <span className="font-medium">
                {page * 10 > total ? total : page * 10}
              </span>{" "}
              | {total} resultados
            </p>

            <div className="flex flex-row items-center gap-2 [&_button]:p-2! [&_button]:w-8 [&_button]:h-8">
              <Button
                variant="outline"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                <ChevronLeft />
              </Button>
              {quantityPages > 2 && page > 2 && (
                <Button variant="outline" onClick={() => setPage(page - 2)}>
                  ...
                </Button>
              )}

              {quantityPages >= 2 && page != 1 && (
                <Button variant="outline" onClick={() => setPage(page - 1)}>
                  {page - 1}
                </Button>
              )}

              <Button variant="default" onClick={() => setPage(page)}>
                {page}
              </Button>

              {page + 1 <= quantityPages && (
                <Button variant="outline" onClick={() => setPage(page + 1)}>
                  {page + 1}
                </Button>
              )}

              {quantityPages > 2 && page + 2 <= quantityPages && (
                <Button variant="outline" onClick={() => setPage(page + 2)}>
                  ...
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => setPage(quantityPages)}
                disabled={page === quantityPages}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
