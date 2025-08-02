# Docker Setup for Splitwise

This directory contains Docker configuration for the full-stack Splitwise application.

## Architecture

- **Frontend**: Angular 19 application served with Nginx
- **Backend**: Express.js API with TypeScript
- **Database**: MongoDB 7.0

## Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Ports 80, 3000, 4200, and 27017 available

### Production Mode

```bash
# Start all services
./docker.sh up

# Or manually
docker-compose up -d
```

### Development Mode

```bash
# Start with hot reload for frontend
./docker.sh up-dev

# Or manually
docker-compose --profile dev up -d
```

## Service URLs

- **Frontend (Production)**: http://localhost
- **Frontend (Development)**: http://localhost:4200
- **Backend API**: http://localhost:3000
- **MongoDB**: localhost:27017

## Useful Commands

```bash
# View logs
./docker.sh logs backend
./docker.sh logs frontend

# Rebuild everything
./docker.sh rebuild

# Stop all services
./docker.sh down

# Clean up
./docker.sh clean
```

## Environment Configuration

Copy `.env.docker` to `.env` and modify values:

```bash
cp .env.docker .env
```

## Database Access

### MongoDB Shell

```bash
docker exec -it splitwise-mongodb mongosh -u admin -p password123 --authenticationDatabase admin
```

### Application Database

```bash
use splitwise-dev
db.users.find()
```

## Health Checks

- **Backend**: http://localhost:3000/health
- **Frontend**: http://localhost/health
- **MongoDB**: Automatic health checks configured

## Volumes

- `mongodb_data`: Persistent MongoDB data storage

## Networks

- `splitwise-network`: Internal network for service communication

## Troubleshooting

### Port Conflicts

If ports are in use, modify the ports in `docker-compose.yml`:

```yaml
ports:
  - '8080:80' # Change frontend port
  - '3001:3000' # Change backend port
```

### Database Connection Issues

1. Check MongoDB container is running: `docker-compose ps`
2. View MongoDB logs: `./docker.sh logs mongodb`
3. Verify connection string in backend logs

### Frontend Build Issues

1. Clear node_modules: `docker-compose build --no-cache frontend`
2. Check Angular build logs: `./docker.sh logs frontend`

### Development Hot Reload

For frontend development with hot reload:

```bash
docker-compose --profile dev up frontend-dev
```

## Production Deployment

For production deployment:

1. Update environment variables in `.env`
2. Use production MongoDB (not local container)
3. Configure proper SSL certificates
4. Use a reverse proxy (nginx/traefik)
5. Set strong passwords and secrets

```bash
# Production environment
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/splitwise-prod
JWT_SECRET=very-strong-production-secret
```
