# -------- Base image --------
FROM node:20-alpine AS base

# -------- Install dependencies --------
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# -------- Build stage --------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js app
RUN yarn build

# -------- Production runner --------
FROM base AS runner
WORKDIR /app

# ✅ Dùng cú pháp ENV key=value
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Tạo user không root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy các file cần thiết
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# ✅ Entry point đúng cho standalone Next.js build
CMD ["node", "server.js"]
