import { createParameterDecorator, type ResolverData } from "type-graphql";
import type { User } from "../../../generated/prisma/client";
import { prismaClient } from "../../../prisma/prisma";
import type { GraphqlContext } from "../context";

export const GqlUser = () =>
	createParameterDecorator(
		async ({ context }: ResolverData<GraphqlContext>): Promise<User | null> => {
			if (!context?.user) {
				return null;
			}

			try {
				const user = await prismaClient.user.findUnique({
					where: { id: context.user },
				});

				if (!user) {
					throw new Error("User not found");
				}

				return user;
			} catch (error) {
				console.log("Error fetching user: ", error);
			}
		},
	);
