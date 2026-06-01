import type {
	CreateCategoryInput,
	UpdateCategoryInput,
} from "@/dtos/input/category.input";
import type { CategorySummaryOutput } from "@/dtos/output/category.output";
import type { CategoryModel } from "@/models/category.model";
import type { Prisma } from "../../generated/prisma/client";
import { prismaClient } from "../../prisma/prisma";

export class CategoryService {
	async create(
		data: CreateCategoryInput,
		userId: string,
	): Promise<CategoryModel> {
		const categoryAlreadyExists = await prismaClient.category.findFirst({
			where: { title: data.title, userId },
		});

		if (categoryAlreadyExists) {
			throw new Error("Category already exists");
		}

		const category = await prismaClient.category.create({
			data: {
				title: data.title,
				description: data.description,
				color: data.color,
				icon: data.icon,
				userId,
			},
		});

		return category;
	}

	async update(id: string, data: UpdateCategoryInput): Promise<CategoryModel> {
		const category = await prismaClient.category.findUnique({
			where: { id },
		});

		if (!category) {
			throw new Error("Category not found");
		}

		const updatedCategory = await prismaClient.category.update({
			where: { id },
			data: { ...data, updatedAt: new Date() },
		});

		return updatedCategory;
	}

	async delete(id: string): Promise<CategoryModel> {
		const category = await prismaClient.category.findUnique({
			where: { id },
		});

		if (!category) {
			throw new Error("Category not found");
		}

		return await prismaClient.category.delete({
			where: { id },
		});
	}

	async findById(id?: string): Promise<CategoryModel | null> {
		if (!id) {
			return null;
		}

		const category = await prismaClient.category.findUnique({
			where: { id },
		});

		if (!category) {
			throw new Error("Category not found");
		}

		return category;
	}

	async listAll(userId: string): Promise<CategoryModel[]> {
		return await prismaClient.category.findMany({ where: { userId } });
	}

	async summaryCategory(userId: string): Promise<CategorySummaryOutput> {
		const totalCategories = await prismaClient.category.count({
			where: { userId },
		});

		const categories = await prismaClient.category.findMany({
			where: { userId },
			include: {
				_count: {
					select: {
						transactions: true,
					},
				},
			},
		});

		const [seedCategory] = categories;
		if (!seedCategory) {
			return { totalCategories, mostUsedCategory: "" };
		}

		type CategoryWithTransactionCount = Prisma.CategoryGetPayload<{
			include: {
				_count: {
					select: {
						transactions: true;
					};
				};
			};
		}>;

		const mostUsedCategory = categories.reduce(
			(
				prev: CategoryWithTransactionCount,
				current: CategoryWithTransactionCount,
			) =>
				prev._count.transactions > current._count.transactions ? prev : current,
			seedCategory,
		);

		return { totalCategories, mostUsedCategory: mostUsedCategory.title };
	}
}
