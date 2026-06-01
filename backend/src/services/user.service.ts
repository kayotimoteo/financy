import type { EditUserInput } from "@/dtos/input/user.input";
import type { UserModel } from "@/models/user.model";
import { prismaClient } from "../../prisma/prisma";

export class UserService {
	async findById(id: string): Promise<UserModel> {
		const user = await prismaClient.user.findUnique({
			where: { id },
		});

		if (!user) {
			throw new Error("User not found");
		}

		return user;
	}

	async edit(id: string, data: EditUserInput): Promise<UserModel> {
		const user = await prismaClient.user.findUnique({
			where: { id },
		});

		if (!user) {
			throw new Error("User not found");
		}

		const updatedUser = await prismaClient.user.update({
			where: { id },
			data,
		});

		return updatedUser;
	}
}
