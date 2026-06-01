import { Field, Float, GraphQLISODateTime, InputType, Int } from "type-graphql";
import { TransactionType } from "@/models/transaction.model";

@InputType({ description: "Transaction input" })
export class CreateTransactionInput {
  @Field(() => String, { description: "Description of the transaction" })
  description!: string;

  @Field(() => Float, { description: "Amount of the transaction" })
  amount!: number;

  @Field(() => TransactionType, { description: "Type of the transaction" })
  type!: TransactionType;

  @Field(() => String, { description: "Category id of the transaction" })
  categoryId!: string;

  @Field(() => GraphQLISODateTime, { description: "Date of the transaction" })
  date!: Date;
}

@InputType({ description: "Update transaction input" })
export class UpdateTransactionInput {
  @Field(() => String, {
    description: "Description of the transaction",
    nullable: true,
  })
  description?: string;

  @Field(() => Float, {
    description: "Amount of the transaction",
    nullable: true,
  })
  amount?: number;

  @Field(() => TransactionType, {
    description: "Type of the transaction",
    nullable: true,
  })
  type?: TransactionType;

  @Field(() => String, {
    description: "Category id of the transaction",
    nullable: true,
  })
  categoryId?: string;

  @Field(() => GraphQLISODateTime, {
    description: "Date of the transaction",
    nullable: true,
  })
  date?: Date;
}

@InputType({ description: "List transactions input" })
export class ListTransactionsInput {
  @Field(() => Int, {
    description: "Offset of the transactions",
    nullable: true,
  })
  offset?: number;

  @Field(() => Int, {
    description: "Limit of the transactions",
    nullable: true,
  })
  limit?: number;

  @Field(() => String, {
    description: "Search term",
    nullable: true,
  })
  search?: string;

  @Field(() => TransactionType, {
    description: "Type of the transaction",
    nullable: true,
  })
  type?: TransactionType;

  @Field(() => String, {
    description: "Category id of the transaction",
    nullable: true,
  })
  categoryId?: string;

  @Field(() => GraphQLISODateTime, {
    description: "Start date of the transaction",
    nullable: true,
  })
  startDate?: Date;

  @Field(() => GraphQLISODateTime, {
    description: "End date of the transaction",
    nullable: true,
  })
  endDate?: Date;
}
