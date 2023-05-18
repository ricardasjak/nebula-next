# docker build -t next-site:v1 .

# Install dependencies only when needed
FROM node:16-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
# RUN yarn install --frozen-lockfile

# If using npm with a `package-lock.json` comment out above and use below instead
RUN npm ci

ENV NEXT_TELEMETRY_DISABLED 1

# Add `ARG` instructions below if you need `NEXT_PUBLIC_` variables
# then put the value on your fly.toml
# Example:
# ARG NEXT_PUBLIC_EXAMPLE="value here"

RUN npm run build
# remove development dependencies
RUN npm prune --production

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app ./
# standalone files:
#COPY --from=builder /app/.env .
#COPY --from=builder /app/package.json .
#COPY --from=builder /app/next.config.js .
#COPY --from=builder /app/public ./public
#COPY --from=builder /app/.next/standalone ./
#COPY --from=builder /app/.next/static ./.next/static
#COPY --from=builder /app/.next/server ./.next/server

USER nextjs

CMD fallocate -l 512M /swap_data && mkswap /swap_data && swapon /swap_data && ls -hla; fi; free -m; /app/run
CMD ["npm", "run", "start"]
# standalone
#CMD ["node", "server.js"]
# docker build -t next-site:v1 .
