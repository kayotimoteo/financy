export type TransactionType = "income" | "expense";

export type Category = {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  countTransactions: number;
  totalAmount: number;
};

export type SummaryTransaction = {
  totalTransactions: number;
  totalBalance: number;
  totalExpenseCurrentMonth: number;
  totalIncomeCurrentMonth: number;
};

export type SummaryCategory = {
  totalCategories: number;
  mostUsedCategory: string;
};

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: TransactionType;
  category?: Category;
};

export type ListTransactions = {
  limit: number;
  offset: number;
  total: number;
  transactions: Transaction[];
};
