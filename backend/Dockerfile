# Base image
FROM node:20-alpine AS base

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Install dependencies
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN npm install

# Generate Prisma Client
RUN npx prisma generate && ls -la generated/prisma/client || echo "Client generation failed"

# Copy source code
COPY . .

# Verify generated client exists
RUN ls -la generated/prisma/client || echo "Warning: Generated client not found"

# Development stage
FROM base AS development
EXPOSE 3001
# Ensure Prisma client is generated before starting (in case volumes overwrite it)
CMD sh -c "npx prisma generate && npm run start:dev"

# Build stage
FROM base AS build
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Install production dependencies only
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN npm install --omit=dev

# Copy built application and generated Prisma client
COPY --from=build /app/dist ./dist
COPY --from=build /app/generated ./generated

EXPOSE 3001
CMD ["npm", "run", "start:prod"]

