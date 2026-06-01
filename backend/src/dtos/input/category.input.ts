import { Field, InputType } from "type-graphql";

@InputType({ description: "Category input" })
export class CreateCategoryInput {
	@Field(() => String, { description: "Title of the category" })
	title!: string;

	@Field(() => String, {
		description: "Description of the category",
		nullable: true,
	})
	description?: string;

	@Field(() => String, { description: "Color of the category" })
	color!: string;

	@Field(() => String, { description: "Icon of the category" })
	icon!: string;
}

@InputType({ description: "Update category input" })
export class UpdateCategoryInput {
	@Field(() => String, { description: "Title of the category" })
	title?: string;

	@Field(() => String, {
		description: "Description of the category",
		nullable: true,
	})
	description?: string;

	@Field(() => String, { description: "Color of the category", nullable: true })
	color?: string;

	@Field(() => String, { description: "Icon of the category", nullable: true })
	icon?: string;
}
