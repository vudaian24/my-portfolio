# ===========================
# 1️⃣ Build stage
# ===========================
FROM node:20-alpine AS builder

# Cài đặt dependency cơ bản (libc6-compat cho Next.js)
RUN apk add --no-cache libc6-compat

# Tạo thư mục làm việc
WORKDIR /app

# Copy các file cần thiết để cài dependencies
COPY package.json yarn.lock ./

# Cài đặt dependencies, bỏ qua script cài đặt không cần thiết (nhanh hơn)
RUN yarn install --frozen-lockfile --ignore-scripts

# Copy toàn bộ mã nguồn
COPY . .

# Tắt telemetry của Next.js
RUN yarn next telemetry disable

# Build ở chế độ production với output standalone
RUN yarn build

# ===========================
# 2️⃣ Runtime stage
# ===========================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy cần thiết từ build stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/src/locales ./src/locales

# Expose port cho container
EXPOSE ${PORT}

# Chạy ứng dụng
CMD ["node", "server.js"]
