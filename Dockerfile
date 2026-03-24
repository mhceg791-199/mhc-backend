FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && pnpm install --frozen-lockfile --prod=false

# Copy source
COPY . .

# Build TypeScript
RUN pnpm build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && pnpm install --frozen-lockfile --prod

COPY --from=base /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "dist/server.js"]
