# Multi-stage build for optimized production image
# Stage 1: Build stage for frontend
FROM node:18-alpine AS frontend-builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine AS production

# Install security updates and required packages
RUN apk update && apk upgrade && \
    apk add --no-cache \
    dumb-init \
    curl \
    tzdata && \
    rm -rf /var/cache/apk/*

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application from frontend-builder stage
COPY --from=frontend-builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=frontend-builder --chown=nextjs:nodejs /app/public ./public
COPY --from=frontend-builder --chown=nextjs:nodejs /app/next.config.js ./

# Copy backend files
COPY --chown=nextjs:nodejs app.js ./
COPY --chown=nextjs:nodejs models ./models
COPY --chown=nextjs:nodejs routes ./routes
COPY --chown=nextjs:nodejs services ./services
COPY --chown=nextjs:nodejs middleware ./middleware

# Create logs directory
RUN mkdir -p logs && chown -R nextjs:nodejs logs

# Create .env file template
RUN echo "# Environment variables - Replace with actual values" > .env.template && \
    echo "NODE_ENV=production" >> .env.template && \
    echo "PORT=3000" >> .env.template && \
    echo "MONGODB_URI=mongodb://localhost:27017/smashlabs" >> .env.template && \
    echo "JWT_SECRET=your-super-secret-jwt-key" >> .env.template && \
    echo "API_SECRET_KEY=your-api-secret-key" >> .env.template && \
    chown nextjs:nodejs .env.template

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "app.js"]

# Labels for better maintainability
LABEL maintainer="SmashLabs Team"
LABEL version="1.0.0"
LABEL description="SmashLabs Rage Room Booking Application"
LABEL org.opencontainers.image.title="SmashLabs"
LABEL org.opencontainers.image.description="Rage room booking and management system"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.source="https://github.com/your-repo/smashlabs"
LABEL org.opencontainers.image.licenses="MIT" 