import { Field, Float, Int, ObjectType } from "type-graphql";
import { TransactionModel } from "@/models/transaction.model";

@ObjectType({ description: "Transaction list output" })
export class TransactionListOutput {
	@Field(() => [TransactionModel], { description: "Transactions list" })
	transactions!: TransactionModel[];

	@Field(() => Number, { description: "Total transactions" })
	total!: number;

	@Field(() => Number, { description: "Offset" })
	offset!: number;

	@Field(() => Number, { description: "Limit" })
	limit!: number;
}

@ObjectType({ description: "Transaction summary output" })
export class TransactionSummaryOutput {
	@Field(() => Int, { description: "Total transactions" })
	totalTransactions!: number;

	@Field(() => Float, { description: "Total balance" })
	totalBalance!: number;

	@Field(() => Float, { description: "Total income of the current month" })
	totalIncomeCurrentMonth!: number;

	@Field(() => Float, { description: "Total expense of the current month" })
	totalExpenseCurrentMonth!: number;
}
