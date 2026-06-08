# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=24-bookworm-slim
ARG PNPM_VERSION=9.15.9

FROM node:${NODE_VERSION} AS base
ARG PNPM_VERSION
ENV PNPM_HOME=/pnpm
ENV PATH=${PNPM_HOME}:${PATH}
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

FROM base AS prod-deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --prod --ignore-scripts

FROM deps AS build
COPY tsconfig.json ./
COPY app.ts ./
COPY bin ./bin
COPY config ./config
COPY database ./database
COPY doc ./doc
COPY exception ./exception
COPY middleware ./middleware
COPY prisma ./prisma
COPY route ./route
COPY src ./src
COPY types ./types
COPY utility ./utility

# Prisma generate only needs a syntactically valid URL here.
# The real DATABASE_URL must be injected at runtime.
ARG PRISMA_GENERATE_DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sistem_kasir?schema=public
ENV DATABASE_URL=${PRISMA_GENERATE_DATABASE_URL}
RUN pnpm run build

FROM node:${NODE_VERSION} AS runner
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app

COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/doc ./doc
COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/prisma ./prisma
COPY --from=build --chown=node:node /app/route ./route

RUN mkdir -p /app/uploads /tmp && chown -R node:node /app/uploads /tmp

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD node -e "const net=require('node:net');const port=Number(process.env.PORT||3000);const s=net.connect(port,'127.0.0.1');s.setTimeout(3000);s.on('connect',()=>{s.end();process.exit(0)});s.on('timeout',()=>{s.destroy();process.exit(1)});s.on('error',()=>process.exit(1));"

CMD ["node", "dist/bin/www.js"]
