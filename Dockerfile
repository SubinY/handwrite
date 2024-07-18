# Build stage
FROM node:19.0.0-alpine AS build
ARG WEB_PATH=/app
WORKDIR $WEB_PATH
COPY package*.json ./
RUN npm install --force
COPY . $WEB_PATH/
RUN npm run build:local

# Production stage
FROM node:19.0.0-slim AS production
ARG WEB_PATH=/www/wwwroot/handwrite
WORKDIR $WEB_PATH
COPY --from=build /app/ ./

