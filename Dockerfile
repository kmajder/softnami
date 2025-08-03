# Dockerfile dla aplikacji Next.js
FROM node:18-alpine AS base

# Build arguments
ARG NODE_ENV=production

# Instalacja zależności tylko gdy są potrzebne
FROM base AS deps
# Sprawdź https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine aby zrozumieć dlaczego libc6-compat może być potrzebne.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Instalacja zależności na podstawie preferowanych package manager
COPY package.json package-lock.json* ./
RUN npm ci --include=dev

# Rebuild źródła aplikacji
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Następny.js zbiera statyczne pliki w folderze .next
RUN npm run build

# Produkcja, kopiuje wszystkie pliki i uruchamia next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# Instalacja curl dla health check
RUN apk add --no-cache curl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Ustawienie poprawnego uprawnienia dla prerendered cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatycznie wykorzystuje output standalone w production
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js jest utworzony przez next build z output standalone
CMD ["node", "server.js"] 