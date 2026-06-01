import {
  Field,
  Float,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from "type-graphql";
import { UserModel } from "./user.model";

@ObjectType({ description: "Category model" })
export class CategoryModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String)
  color!: string;

  @Field(() => String)
  icon!: string;

  @Field(() => Int, { nullable: true })
  countTransactions?: number;

  @Field(() => Float, { nullable: true })
  totalAmount?: number;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;

  @Field(() => String)
  userId!: string;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;
}
