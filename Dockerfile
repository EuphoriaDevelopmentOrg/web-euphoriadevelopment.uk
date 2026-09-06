FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build:css

FROM nginx:alpine

COPY --from=builder /app /usr/share/nginx/html

EXPOSE 80
