import { Arg, Mutation, Resolver } from "type-graphql";
import type { User } from "../../generated/prisma/client";
import { EditUserInput } from "../dtos/input/user.input";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";

@Resolver()
export class UserResolver {
  private userService = new UserService();

  @Mutation(() => UserModel, { description: "Edit a user" })
  async editUser(
    @Arg("data", () => EditUserInput) data: EditUserInput,
    @GqlUser() user: User
  ): Promise<UserModel> {
    return this.userService.edit(user.id, data);
  }
}
