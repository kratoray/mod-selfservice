# 1. Install dependencies
FROM registry.mindef.nl/dbdaap/images/node:20 AS deps

ARG NPM_TOKEN

WORKDIR /app

COPY package.json package-lock.json .npmrc ./

RUN npm ci

# 2. Build the application
FROM registry.mindef.nl/dbdaap/images/node:20 AS builder

ARG STRAPI_API_URL
ARG STRAPI_API_TOKEN

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# 3. Create the final image
FROM registry.mindef.nl/dbdaap/images/node:20 AS runner

WORKDIR /app

ENV PORT=8080

RUN apk add ca-certificates

RUN addgroup -g 1001 -S app
RUN adduser -S app -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=app:app /app/.next/standalone ./
COPY --from=builder --chown=app:app /app/.next/static ./.next/static
COPY ./root-cas.crt ./root-cas.crt
COPY ./root-cas.crt /usr/local/share/ca-certificates/root-cas.crt

RUN update-ca-certificates

USER app

EXPOSE 8080

CMD ["node", "server.js"]
