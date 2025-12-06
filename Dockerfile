# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install Python, build tools, and OpenSSL 1.1 compatibility for Prisma
RUN apk add --no-cache python3 make g++ openssl1.1-compat

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install --ignore-scripts

# Generate Prisma Client
RUN npx prisma generate

# Copy source code
COPY . .

# Ensure public directory exists (Next.js requires it)
RUN mkdir -p public

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install Python, build tools, and OpenSSL 1.1 compatibility for Prisma
RUN apk add --no-cache python3 make g++ openssl1.1-compat

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install production dependencies only
RUN npm install --only=production --ignore-scripts

# Generate Prisma Client
RUN npx prisma generate

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js

# Copy public directory (ensured to exist in builder stage)
COPY --from=builder /app/public ./public

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Change ownership
RUN chown -R nextjs:nodejs /app

USER nextjs

# Render sets PORT environment variable (defaults to 10000)
# Next.js will automatically use PORT env var if available
ENV HOSTNAME="0.0.0.0"

# Expose port 10000 (Render's default, actual port comes from PORT env var)
EXPOSE 10000

# Use PORT environment variable for Next.js (Render sets this to 10000)
CMD sh -c "node_modules/.bin/next start -p ${PORT:-10000}"

