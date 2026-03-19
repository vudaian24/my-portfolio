# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN yarn build

# Stage 3: Runner
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME="0.0.0.0" \
    NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 portfolio_group && \
    adduser --system --uid 1001 portfolio_user

COPY --from=builder --chown=portfolio_user:portfolio_group /app/public ./public
COPY --from=builder --chown=portfolio_user:portfolio_group /app/.next/standalone ./
COPY --from=builder --chown=portfolio_user:portfolio_group /app/.next/static ./.next/static
COPY --from=builder --chown=portfolio_user:portfolio_group /app/src/locales ./src/locales

USER portfolio_user
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget -qO- http://localhost:3000 || exit 1

CMD ["node", "server.js"]
