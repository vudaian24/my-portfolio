# syntax=docker/dockerfile:1

# Next.js 15 standalone — https://nextjs.org/docs/app/building-your-application/deploying#docker-image
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# --- Dependencies (layer cache: package.json + yarn.lock only) ---
FROM base AS deps
ENV HUSKY=0 \
    CI=true
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/root/.yarn-cache \
    yarn install --frozen-lockfile --network-timeout 300000

# --- Build (webpack; avoid --turbopack in Docker/CI) ---
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1 \
    HUSKY=0 \
    CI=true
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn next build

# --- Production runner (standalone output) ---
FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# next-intl dynamic imports: ensure locale JSON is available at runtime
COPY --from=builder --chown=nextjs:nodejs /app/src/locales ./src/locales

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
