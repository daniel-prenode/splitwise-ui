#!/bin/bash

# Docker management scripts for Splitwise

case "$1" in
  "up")
    echo "Starting all services..."
    docker-compose up -d
    ;;
  "up-dev")
    echo "Starting development services..."
    docker-compose --profile dev up -d
    ;;
  "down")
    echo "Stopping all services..."
    docker-compose down
    ;;
  "logs")
    echo "Showing logs for service: $2"
    docker-compose logs -f $2
    ;;
  "build")
    echo "Building all services..."
    docker-compose build
    ;;
  "rebuild")
    echo "Rebuilding all services..."
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    ;;
  "clean")
    echo "Cleaning up containers, images, and volumes..."
    docker-compose down -v
    docker system prune -f
    ;;
  "status")
    echo "Service status:"
    docker-compose ps
    ;;
  *)
    echo "Usage: $0 {up|up-dev|down|logs|build|rebuild|clean|status}"
    echo ""
    echo "Commands:"
    echo "  up       - Start all services in production mode"
    echo "  up-dev   - Start all services in development mode"
    echo "  down     - Stop all services"
    echo "  logs     - Show logs for a specific service"
    echo "  build    - Build all services"
    echo "  rebuild  - Rebuild all services from scratch"
    echo "  clean    - Clean up containers, images, and volumes"
    echo "  status   - Show status of all services"
    ;;
esac
