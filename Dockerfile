# --- Stage 1: Base ---
FROM node:22-alpine AS base
WORKDIR /app

# --- Stage 2: Dependencies ---
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci && mkdir -p /app/.next && chown -R 1000:1000 /app

# --- Stage 3: Builder ---
FROM deps AS builder
COPY . .
RUN npm run build

# --- Stage 4: Runner (production) ---
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3333
ENV PORT=3333
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
