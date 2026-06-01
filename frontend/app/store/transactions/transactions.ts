import type { TransactionType } from "@/types/types";
import type { DateRange } from "react-day-picker";
import { create } from "zustand";

type TransactionsState = {
  filters: {
    search: string;
    type: TransactionType | "all";
    categoryId: string;
    period?: DateRange;
  };
  setSearch: (search: string) => void;
  setType: (type: TransactionType | "all") => void;
  setCategoryId: (category: string) => void;
  setPeriod: (period?: DateRange) => void;
};

export const useTransactionsStore = create<TransactionsState>()((set) => ({
  filters: {
    search: "",
    type: "all",
    categoryId: "all",
    period: undefined,
  },
  setSearch: (search: string) => {
    set(({ filters }) => ({ filters: { ...filters, search } }));
  },
  setType: (type: TransactionType | "all") => {
    set(({ filters }) => ({ filters: { ...filters, type } }));
  },
  setCategoryId: (categoryId: string) => {
    set(({ filters }) => ({ filters: { ...filters, categoryId } }));
  },
  setPeriod: (period?: DateRange) => {
    set(({ filters }) => ({ filters: { ...filters, period } }));
  },
}));
