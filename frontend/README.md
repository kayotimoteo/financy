# Financy — Frontend

SPA em React + Vite com Apollo Client, React Router e Tailwind CSS v4.

## Configuração

```bash
bun install
cp .env.example .env
```

Defina `VITE_BACKEND_URL` no `.env` (ex.: `http://localhost:4000/graphql`).

## Desenvolvimento

```bash
bun run dev
```

Aplicação em `http://localhost:5173`.

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
