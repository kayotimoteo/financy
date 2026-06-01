import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import { buildContext } from "@/graphql/context";
import { AuthResolver } from "@/resolvers/auth.resolver";
import { CategoryResolver } from "@/resolvers/category.resolver";
import { TransactionResolver } from "@/resolvers/transaction.resolver";
import { UserResolver } from "@/resolvers/user.resolver";

async function main() {
	const app = express();

	const schema = await buildSchema({
		resolvers: [
			AuthResolver,
			CategoryResolver,
			TransactionResolver,
			UserResolver,
		],
		validate: true,
		emitSchemaFile: "./schema.graphql",
	});

	const server = new ApolloServer({ schema });

	await server.start();

	app.use(
		"/graphql",
		cors({ origin: "http://localhost:5173" }),
		express.json(),
		expressMiddleware(server, {
			context: buildContext,
		}),
	);

	app.listen({ port: 4000 }, () => {
		console.log("🚀 Server ready at: http://localhost:4000");
	});
}

main();
