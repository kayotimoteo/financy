import type { TransactionType, Transaction } from "@/types/types";

export type CreateEditTransactionProps = {
  isOpen: boolean;
  transaction?: Transaction;
  onOpenChange: (open: boolean) => void;
};

export type TransactionFormData = {
  description: string;
  amount: number;
};

export type TransactionInput = TransactionFormData & {
  type: TransactionType;
  categoryId: string;
  date: string;
};

export type TransactionOutput = {
  createTransaction: Transaction;
};
