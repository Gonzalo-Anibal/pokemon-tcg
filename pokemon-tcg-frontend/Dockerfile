# Frontend Dockerfile
FROM node:18 as build

WORKDIR /app

COPY package*.json ./
COPY vite.config.js ./
COPY src ./src
COPY public ./public

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80
