FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN yarn install --production
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]
