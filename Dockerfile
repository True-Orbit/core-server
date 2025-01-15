# ========
# Build
# ========

FROM node:21.7.3-alpine AS builder

RUN apk add --no-cache \
  npm \
  git \
  python3 \
  make \
  g++

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# ========
# Run
# ========

FROM node:21.7.3-alpine AS runner

RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/knexfile.ts ./

EXPOSE 4000

CMD ["npm", "run", "start"]