FROM node:22-alpine as builder

RUN apk add openssl

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# use latest lts node version
FROM node:22-alpine

RUN apk add openssl

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
RUN npm run prisma generate

EXPOSE 3000
CMD ["npm", "run", "start"]