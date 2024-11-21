FROM node:18-alpine AS builder
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Clear cache and ensure clean install
RUN npm cache clean --force

# Copy package files first
COPY package*.json ./

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps --verbose

# Copy entire project
COPY . .

# Set Node memory
ENV NODE_OPTIONS=--max_old_space_size=4096

# Install sharp for image optimization
RUN npm install sharp

# Build with verbose logging
RUN npm run build --verbose

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy build artifacts
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./

# Install production dependencies
RUN npm install --production --legacy-peer-deps

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"]