# Financy - Frontend

SPA em React + Vite com Apollo Client, React Router e Tailwind CSS v4.

## Configuração

```bash
bun install
cp .env.example .env
```

Defina `VITE_BACKEND_URL` no `.env`:

```env
VITE_BACKEND_URL=http://localhost:4000/graphql
```

## Desenvolvimento

```bash
bun run dev
```

Aplicação em `http://localhost:5173`.

## Rotas principais

- `/` redireciona para `/login` quando o usuário está deslogado e para `/dashboard` quando está autenticado.
- `/login` e `/signup` são rotas públicas.
- `/dashboard`, `/transactions`, `/categories` e `/account` são rotas protegidas.

## Produção

```bash
bun run build
bun run preview
```

## Docker

```bash
docker build -t financy-frontend .
docker run -p 8080:80 financy-frontend
```
