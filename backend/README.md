# Financy - Backend

API GraphQL em Bun, Express, Apollo Server, TypeGraphQL e Prisma.

## Configuração

```bash
bun install
cp .env.example .env
```

Variáveis esperadas:

```env
DATABASE_URL=file:./database.db
JWT_SECRET=troque-este-segredo
CORS_ORIGIN=http://localhost:5173
```

## Desenvolvimento

```bash
bun run dev
```

Servidor GraphQL em `http://localhost:4000/graphql`.

## Isolamento por usuário

As rotas protegidas usam o middleware `IsAuth`, que valida o token JWT e injeta o usuário autenticado no contexto GraphQL. Serviços de categorias e transações sempre recebem o `userId` do usuário autenticado para criar, listar, atualizar, deletar e buscar dados por ID.

Isso impede que um usuário acesse ou altere categorias e transações de outra conta mesmo conhecendo o ID do registro.

## Validação local

```bash
bunx tsc --noEmit
bunx biome check --config-path biome.jsonc src
```
