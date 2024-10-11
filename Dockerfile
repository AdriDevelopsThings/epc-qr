FROM node:22-slim AS base
WORKDIR /build
RUN corepack enable

FROM base AS deps

COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps as build
COPY . .
RUN pnpm next build

FROM nginx
COPY --from=build /build/out /usr/share/nginx/html