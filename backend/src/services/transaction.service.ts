import type { Prisma } from "../../generated/prisma/client";
import { prismaClient } from "../../prisma/prisma";
import type {
  CreateTransactionInput,
  ListTransactionsInput,
  UpdateTransactionInput,
} from "../dtos/input/transaction.input";
import type {
  TransactionListOutput,
  TransactionSummaryOutput,
} from "../dtos/output/transaction.output";
import type {
  TransactionModel,
  TransactionType,
} from "../models/transaction.model";

function resolveCategoryId(categoryId?: string) {
  const id = categoryId?.trim();
  return id || undefined;
}

export class TransactionService {
  private async assertCategoryBelongsToUser(
    categoryId: string,
    userId: string
  ) {
    const category = await prismaClient.category.findFirst({
      where: { id: categoryId, userId },
    });

    if (!category) {
      throw new Error("Category not found");
    }
  }

  async create(
    data: CreateTransactionInput,
    userId: string
  ): Promise<TransactionModel> {
    const categoryId = resolveCategoryId(data.categoryId);

    if (categoryId) {
      await this.assertCategoryBelongsToUser(categoryId, userId);
    }

    const transaction = await prismaClient.transaction.create({
      data: {
        description: data.description,
        amount: data.amount,
        type: data.type,
        date: data.date,
        userId,
        ...(categoryId ? { categoryId } : {}),
      },
    });

    return { ...transaction, type: transaction.type as TransactionType };
  }

  async update(
    id: string,
    data: UpdateTransactionInput,
    userId: string
  ): Promise<TransactionModel> {
    const transaction = await prismaClient.transaction.findFirst({
      where: { id, userId },
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    const categoryId =
      data.categoryId === undefined
        ? undefined
        : resolveCategoryId(data.categoryId);

    if (categoryId) {
      await this.assertCategoryBelongsToUser(categoryId, transaction.userId);
    }

    const { categoryId: _categoryId, ...rest } = data;

    const updatedTransaction = await prismaClient.transaction.update({
      where: { id },
      data: {
        ...rest,
        ...(data.categoryId === undefined
          ? {}
          : { categoryId: categoryId ?? null }),
        updatedAt: new Date(),
      },
    });

    return {
      ...updatedTransaction,
      type: updatedTransaction.type as TransactionType,
    };
  }

  async delete(id: string, userId: string): Promise<TransactionModel> {
    const transaction = await prismaClient.transaction.findFirst({
      where: { id, userId },
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    const transactionDeleted = await prismaClient.transaction.delete({
      where: { id },
    });

    return {
      ...transactionDeleted,
      type: transactionDeleted.type as TransactionType,
    };
  }

  async list(
    userId: string,
    data?: ListTransactionsInput
  ): Promise<TransactionListOutput> {
    const offset = data?.offset || 0;
    const limit = data?.limit || 10;

    const search: Prisma.TransactionWhereInput = {};

    if (data?.search) {
      search.description = {
        contains: data.search,
      };
    }

    if (data?.type) {
      search.type = data.type;
    }

    if (data?.categoryId) {
      search.categoryId = data.categoryId;
    }

    if (data?.startDate || data?.endDate) {
      const dateFilter: Prisma.DateTimeFilter = {};

      if (data?.startDate) {
        dateFilter.gte = new Date(data.startDate.setHours(0, 0, 0, 0));
      }

      if (data?.endDate) {
        dateFilter.lte = new Date(data.endDate.setHours(23, 59, 59, 999));
      }

      search.date = dateFilter;
    }

    const total = await prismaClient.transaction.count({
      where: { userId, ...search },
    });
    const transactions = await prismaClient.transaction.findMany({
      where: {
        userId,
        ...search,
      },
      skip: offset,
      take: limit,
      orderBy: {
        date: "desc",
      },
    });

    return {
      transactions: transactions as TransactionModel[],
      total,
      offset,
      limit,
    };
  }

  async summary(userId: string): Promise<TransactionSummaryOutput> {
    const totalIncomeCurrentMonth = await this.totalIncomeCurrentMonth(userId);
    const totalExpenseCurrentMonth =
      await this.totalExpenseCurrentMonth(userId);
    const totalBalance = await this.totalBalance(userId);

    const totalTransactions = await prismaClient.transaction.count({
      where: {
        userId,
      },
    });

    return {
      totalTransactions,
      totalBalance,
      totalIncomeCurrentMonth,
      totalExpenseCurrentMonth,
    };
  }

  async totalBalance(userId: string): Promise<number> {
    const income = await prismaClient.transaction.aggregate({
      where: {
        userId,
        type: "income",
      },
      _sum: { amount: true },
    });
    const expense = await prismaClient.transaction.aggregate({
      where: {
        userId,
        type: "expense",
      },
      _sum: { amount: true },
    });

    return (income._sum.amount || 0) - (expense._sum.amount || 0);
  }

  async totalIncomeCurrentMonth(userId: string): Promise<number> {
    const aggregate = await prismaClient.transaction.aggregate({
      where: {
        userId,
        type: "income",
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
      _sum: { amount: true },
    });

    return aggregate._sum.amount || 0;
  }

  async totalExpenseCurrentMonth(userId: string): Promise<number> {
    const aggregate = await prismaClient.transaction.aggregate({
      where: {
        userId,
        type: "expense",
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
      _sum: { amount: true },
    });

    return aggregate._sum.amount || 0;
  }

  async countTransactionsByCategoryId(
    userId: string,
    id: string
  ): Promise<number> {
    return await prismaClient.transaction.count({
      where: { userId, categoryId: id },
    });
  }

  async totalAmountByCategoryId(
    userId: string,
    categoryId: string
  ): Promise<number> {
    const [income, expense] = await Promise.all([
      prismaClient.transaction.aggregate({
        where: { userId, categoryId, type: "income" },
        _sum: { amount: true },
      }),
      prismaClient.transaction.aggregate({
        where: { userId, categoryId, type: "expense" },
        _sum: { amount: true },
      }),
    ]);

    return (income._sum.amount || 0) - (expense._sum.amount || 0);
  }
}
