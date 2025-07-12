# 🚀 SmashLabs Production Deployment Guide

This guide covers deploying SmashLabs to production with industry-standard practices including containerization, monitoring, security, and CI/CD.

## 📋 Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)
- MongoDB Atlas account (or self-hosted MongoDB)
- Redis instance
- SSL certificates
- Domain name

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Load Balancer │    │   Application   │    │    Database     │
│    (Nginx)      │◄──►│   (Node.js)     │◄──►│   (MongoDB)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                       ┌─────────────────┐
                       │     Cache       │
                       │    (Redis)      │
                       └─────────────────┘
```

## 🔧 Environment Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-org/smashlabs.git
cd smashlabs
```

### 2. Environment Variables
Create production `.env` file:
```bash
# Server Configuration
NODE_ENV=production
PORT=3000

# Database (REPLACE WITH YOUR ACTUAL CREDENTIALS)
MONGODB_URI=mongodb+srv://YOUR_DB_USER:YOUR_DB_PASSWORD@YOUR_CLUSTER.mongodb.net/smashlabs
REDIS_URL=redis://YOUR_REDIS_USER:YOUR_REDIS_PASSWORD@YOUR_REDIS_HOST:6379

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters
API_SECRET_KEY=your-api-secret-key-for-service-to-service-calls

# Email Service
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Monitoring
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
HELMET_CSP_DIRECTIVES=default-src 'self'
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## 🐳 Docker Deployment

### Option 1: Docker Compose (Recommended for single server)

```bash
# Production deployment
docker-compose --profile production up -d

# Development with monitoring
docker-compose --profile development up -d
```

### Option 2: Docker Swarm (Multi-server)

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml smashlabs
```

### Option 3: Kubernetes

```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: smashlabs-app
  labels:
    app: smashlabs
spec:
  replicas: 3
  selector:
    matchLabels:
      app: smashlabs
  template:
    metadata:
      labels:
        app: smashlabs
    spec:
      containers:
      - name: smashlabs
        image: ghcr.io/your-org/smashlabs:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: smashlabs-secrets
              key: mongodb-uri
        resources:
          limits:
            memory: "512Mi"
            cpu: "500m"
          requests:
            memory: "256Mi"
            cpu: "250m"
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

## 🔒 Security Configuration

### 1. SSL/TLS Setup
```bash
# Using Let's Encrypt with Certbot
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Or use existing certificates
cp your-cert.pem ./docker/nginx/ssl/
cp your-key.pem ./docker/nginx/ssl/
```

### 2. Nginx Configuration
```nginx
# docker/nginx/nginx.conf
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    
    location / {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://app:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 3. Database Security
```javascript
// Enable MongoDB authentication
use admin
db.createUser({
  user: "admin",
  pwd: "secure-password",
  roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]
});

// Create application user
use smashlabs
db.createUser({
  user: "smashlabs-app",
  pwd: "secure-app-password",
  roles: ["readWrite"]
});
```

## 📊 Monitoring & Logging

### 1. Application Monitoring
```bash
# Install monitoring tools
npm install @sentry/node newrelic

# Add to your app.js
const Sentry = require('@sentry/node');
const newrelic = require('newrelic');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});
```

### 2. Infrastructure Monitoring
```yaml
# docker-compose.monitoring.yml
version: '3.8'
services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
    volumes:
      - grafana-data:/var/lib/grafana

  node-exporter:
    image: prom/node-exporter:latest
    ports:
      - "9100:9100"

volumes:
  grafana-data:
```

### 3. Log Management
```bash
# View application logs
docker-compose logs -f app

# View specific service logs
docker-compose logs -f mongodb
docker-compose logs -f redis

# Log aggregation with ELK Stack
docker-compose -f docker-compose.elk.yml up -d
```

## 🚀 Deployment Strategies

### Blue-Green Deployment
```bash
# Deploy new version to green environment
docker-compose -f docker-compose.green.yml up -d

# Run health checks
./scripts/health-check.sh green

# Switch traffic to green
./scripts/switch-traffic.sh green

# Cleanup blue environment
docker-compose -f docker-compose.blue.yml down
```

### Rolling Deployment (Kubernetes)
```bash
# Update deployment with new image
kubectl set image deployment/smashlabs-app smashlabs=ghcr.io/your-org/smashlabs:v2.0.0

# Check rollout status
kubectl rollout status deployment/smashlabs-app

# Rollback if needed
kubectl rollout undo deployment/smashlabs-app
```

## 🔄 CI/CD Pipeline

### GitHub Actions
The pipeline automatically:
1. Runs tests and security scans
2. Builds Docker images
3. Deploys to staging/production
4. Runs performance tests
5. Sends notifications

### Manual Deployment
```bash
# Build and tag image
docker build -t smashlabs:v1.0.0 .

# Push to registry
docker tag smashlabs:v1.0.0 ghcr.io/your-org/smashlabs:v1.0.0
docker push ghcr.io/your-org/smashlabs:v1.0.0

# Deploy to production
docker-compose pull
docker-compose up -d --no-deps app
```

## 📈 Performance Optimization

### 1. Application Level
```javascript
// Enable compression
app.use(compression());

// Optimize database queries
bookingSchema.index({ date: 1, time: 1 });
bookingSchema.index({ email: 1 });

// Implement caching
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);
```

### 2. Infrastructure Level
```bash
# Horizontal scaling
docker-compose up -d --scale app=3

# Load balancing
# Update nginx.conf with upstream configuration
```

### 3. Database Optimization
```javascript
// Connection pooling
const mongoOptions = {
  maxPoolSize: 10,
  minPoolSize: 5,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000
};
```

## 🛡️ Backup & Recovery

### Database Backup
```bash
# Automated daily backups
mongodump --uri="$MONGODB_URI" --out="/backups/$(date +%Y%m%d)"

# Restore from backup
mongorestore --uri="$MONGODB_URI" /backups/20231201
```

### Application Data Backup
```bash
# Backup logs and uploads
tar -czf backup-$(date +%Y%m%d).tar.gz logs/ uploads/

# Sync to S3
aws s3 sync /backups s3://your-backup-bucket/smashlabs/
```

## 🔍 Troubleshooting

### Common Issues

1. **Container won't start**
```bash
# Check logs
docker-compose logs app

# Check health
docker-compose exec app curl http://localhost:3000/
```

2. **Database connection issues**
```bash
# Test MongoDB connection
mongosh "$MONGODB_URI"

# Check network connectivity
docker-compose exec app ping mongodb
```

3. **Memory issues**
```bash
# Monitor memory usage
docker stats

# Increase memory limits
# Update docker-compose.yml deploy.resources.limits.memory
```

### Health Checks
```bash
# Application health
curl https://yourdomain.com/

# Database health
mongosh --eval "db.adminCommand('ping')"

# Cache health
redis-cli ping
```

## 📞 Support & Maintenance

### Monitoring Alerts
Set up alerts for:
- High response times (>2s)
- Error rates (>5%)
- Memory usage (>80%)
- Disk space (>90%)
- Failed deployments

### Regular Maintenance
- Update dependencies monthly
- Review logs weekly
- Database optimization quarterly
- Security audits bi-annually

### Emergency Procedures
1. **Service Down**: Check health endpoints, restart services
2. **Database Issues**: Check connections, restore from backup
3. **Security Breach**: Rotate secrets, review access logs
4. **Performance Issues**: Scale horizontally, optimize queries

## 📚 Additional Resources

- [MongoDB Production Checklist](https://docs.mongodb.com/manual/administration/production-checklist/)
- [Node.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Docker Production Guide](https://docs.docker.com/config/containers/resource_constraints/)
- [Nginx Performance Tuning](https://www.nginx.com/blog/tuning-nginx/)

---

## 🎯 Success Metrics

After deployment, monitor these KPIs:
- Uptime: >99.9%
- Response time: <500ms
- Error rate: <1%
- Test coverage: >80%
- Security scan: 0 high vulnerabilities

**Your SmashLabs application is now production-ready! 🚀** 