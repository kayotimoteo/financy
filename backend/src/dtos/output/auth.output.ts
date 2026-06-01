import { Field, ObjectType } from "type-graphql";
import { UserModel } from "@/models/user.model";

@ObjectType({ description: "Register output" })
export class RegisterOutput {
	@Field(() => String, { description: "Access token (expires in 15 minutes)" })
	token!: string;

	@Field(() => String, { description: "Refresh token (expires in 1 day)" })
	refreshToken!: string;

	@Field(() => UserModel, { description: "User data" })
	user!: UserModel;
}

@ObjectType({ description: "Login output" })
export class LoginOutput {
	@Field(() => String, { description: "Access token (expires in 15 minutes)" })
	token!: string;

	@Field(() => String, { description: "Refresh token (expires in 1 day)" })
	refreshToken!: string;

	@Field(() => UserModel, { description: "User data" })
	user!: UserModel;
}
