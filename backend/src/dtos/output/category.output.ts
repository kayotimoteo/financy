import { Field, Int, ObjectType } from "type-graphql";

@ObjectType({ description: "Category summary output" })
export class CategorySummaryOutput {
  @Field(() => Int, { description: "Total categories" })
  totalCategories!: number;

  @Field(() => String, { description: "Most used category" })
  mostUsedCategory!: string;
}
