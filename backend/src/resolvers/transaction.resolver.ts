import {
	Arg,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from "type-graphql";
import {
	CreateTransactionInput,
	ListTransactionsInput,
	UpdateTransactionInput,
} from "@/dtos/input/transaction.input";
import {
	TransactionListOutput,
	TransactionSummaryOutput,
} from "@/dtos/output/transaction.output";
import { GqlUser } from "@/graphql/decorators/user.decorator";
import { IsAuth } from "@/middlewares/auth.middleware";
import { CategoryModel } from "@/models/category.model";
import { TransactionModel } from "@/models/transaction.model";
import { UserModel } from "@/models/user.model";
import { CategoryService } from "@/services/category.service";
import { TransactionService } from "@/services/transaction.service";
import { UserService } from "@/services/user.service";
import type { User } from "../../generated/prisma/client";

@Resolver(TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
	private userService = new UserService();
	private categoryService = new CategoryService();
	private transactionService = new TransactionService();

	@Mutation(() => TransactionModel, { description: "Create a new transaction" })
	async createTransaction(
		@Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
		@GqlUser() user: User,
	): Promise<TransactionModel> {
		return this.transactionService.create(data, user.id);
	}

	@Mutation(() => TransactionModel, { description: "Update a transaction" })
	async updateTransaction(
		@Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
		@Arg("id", () => String) id: string,
	): Promise<TransactionModel> {
		return this.transactionService.update(id, data);
	}

	@Mutation(() => Boolean, { description: "Delete a transaction" })
  async deleteTransaction(
    @Arg("id", () => String) id: string
  ): Promise<boolean> {
    await this.transactionService.delete(id);

    return true;
  }

	@Query(() => TransactionListOutput, { description: "List transactions" })
	async listTransactions(
		@GqlUser() user: User,
		@Arg("data", () => ListTransactionsInput, { nullable: true })
    data?: ListTransactionsInput,
	): Promise<TransactionListOutput> {
		return this.transactionService.list(user.id, data);
	}

	@Query(() => TransactionSummaryOutput, { description: "Transaction summary" })
  async summaryTransaction(
    @GqlUser() user: User
  ): Promise<TransactionSummaryOutput> {
    return this.transactionService.summary(user.id);
  }

	@FieldResolver(() => UserModel)
  async user(@Root() transaction: TransactionModel): Promise<UserModel> {
    return this.userService.findById(transaction.userId);
  }

	@FieldResolver(() => CategoryModel, { nullable: true })
  async category(
    @Root() transaction: TransactionModel
  ): Promise<CategoryModel | null> {
    return this.categoryService.findById(transaction.categoryId) || null;
  }
}
