import { Field, InputType } from "type-graphql";

@InputType({ description: "User edit input" })
export class EditUserInput {
	@Field(() => String, { description: "Name of the user" })
	name!: string;
}
