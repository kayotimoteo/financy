import { IsEmail, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType({ description: "Register input" })
export class RegisterInput {
	@Field(() => String, { description: "Name of the user" })
	name!: string;

	@Field(() => String, { description: "Email of the user" })
	@IsEmail()
	email!: string;

	@Field(() => String, { description: "Password of the user" })
	@MinLength(8)
	password!: string;
}

@InputType({ description: "Login input" })
export class LoginInput {
	@Field(() => String, { description: "Email of the user" })
	@IsEmail()
	email!: string;

	@Field(() => String, { description: "Password of the user" })
	@MinLength(8)
	password!: string;
}
