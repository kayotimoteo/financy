import { CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react";
import { Card } from "../Card";
import { useQuery } from "@apollo/client/react";
import { SUMMARY_TRANSACTION } from "@/lib/graphql/queries/Transaction";
import type { SummaryTransaction } from "@/types/types";

export const Cards = () => {
  const { data, loading, error } = useQuery<{
    summaryTransaction: SummaryTransaction;
  }>(SUMMARY_TRANSACTION);

  return (
    <div className="grid grid-cols-3 gap-6">
      <Card
        icon={<Wallet className="h-5 w-5 text-purple-base" />}
        title="Saldo total"
        value={data?.summaryTransaction.totalBalance}
        isLoading={loading}
        isError={!!error}
      />
      <Card
        icon={<CircleArrowUp className="h-5 w-5 text-brand-base" />}
        title="Receitas do mês"
        value={data?.summaryTransaction.totalIncomeCurrentMonth}
        isLoading={loading}
        isError={!!error}
      />
      <Card
        icon={<CircleArrowDown className="h-5 w-5 text-red-base" />}
        title="Despesas do mês"
        value={data?.summaryTransaction.totalExpenseCurrentMonth}
        isLoading={loading}
        isError={!!error}
      />
    </div>
  );
};
