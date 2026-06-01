import {
  Arg,
  FieldResolver,
  Float,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/dtos/input/category.input";
import { CategorySummaryOutput } from "@/dtos/output/category.output";
import { GqlUser } from "@/graphql/decorators/user.decorator";
import { IsAuth } from "@/middlewares/auth.middleware";
import { CategoryModel } from "@/models/category.model";
import { UserModel } from "@/models/user.model";
import { CategoryService } from "@/services/category.service";
import { TransactionService } from "@/services/transaction.service";
import { UserService } from "@/services/user.service";
import type { User } from "../../generated/prisma/client";

@Resolver(CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private userService = new UserService();
  private transactionService = new TransactionService();
  private categoryService = new CategoryService();

  @Mutation(() => CategoryModel, { description: "Create a new category" })
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: User
  ): Promise<CategoryModel> {
    return this.categoryService.create(data, user.id);
  }

  @Mutation(() => CategoryModel, { description: "Update a category" })
  async updateCategory(
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
    @Arg("id", () => String) id: string,
    @GqlUser() user: User
  ): Promise<CategoryModel> {
    return this.categoryService.update(id, data, user.id);
  }

  @Mutation(() => Boolean, { description: "Delete a category" })
  async deleteCategory(
    @Arg("id", () => String) id: string,
    @GqlUser() user: User
  ): Promise<boolean> {
    await this.categoryService.delete(id, user.id);

    return true;
  }

  @Query(() => CategoryModel, { description: "Find a category by id" })
  async findCategoryById(
    @Arg("id", () => String) id: string,
    @GqlUser() user: User
  ): Promise<CategoryModel> {
    const category = await this.categoryService.findById(id, user.id);

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  }

  @Query(() => [CategoryModel], { description: "List all categories" })
  async listAllCategories(@GqlUser() user: User): Promise<CategoryModel[]> {
    return this.categoryService.listAll(user.id);
  }

  @Query(() => CategorySummaryOutput, { description: "Category summary" })
  async summaryCategory(@GqlUser() user: User): Promise<CategorySummaryOutput> {
    return this.categoryService.summaryCategory(user.id);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() category: CategoryModel): Promise<UserModel> {
    return this.userService.findById(category.userId);
  }

  @FieldResolver(() => Int)
  async countTransactions(@Root() category: CategoryModel): Promise<number> {
    return this.transactionService.countTransactionsByCategoryId(
      category.userId,
      category.id
    );
  }

  @FieldResolver(() => Float)
  async totalAmount(@Root() category: CategoryModel): Promise<number> {
    return this.transactionService.totalAmountByCategoryId(
      category.userId,
      category.id
    );
  }
}
