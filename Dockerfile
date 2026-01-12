# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM nginx:alpine AS production

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 8080 (fly.io default)
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
