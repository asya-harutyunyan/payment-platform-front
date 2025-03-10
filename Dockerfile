FROM oven/bun:canary-alpine AS builder

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

RUN bun run build

EXPOSE 8080

CMD ["bun","run", "preview", "--port","8080"]