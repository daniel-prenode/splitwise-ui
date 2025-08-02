#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Splitwise Development Environment${NC}"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if MongoDB is running
check_mongodb_running() {
    if pgrep -x "mongod" > /dev/null; then
        return 0
    else
        return 1
    fi
}

# Check for required tools
if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

if ! command_exists npm; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ No package.json found. Please run this script from the project root.${NC}"
    exit 1
fi

# Check MongoDB
if ! command_exists mongod; then
    echo -e "${YELLOW}⚠️  MongoDB is not installed. Backend will fail to start.${NC}"
    echo -e "${BLUE}Run: cd splitwise-backend && npm run setup:db${NC}"
    echo -e "${BLUE}Or install MongoDB manually${NC}"
    echo ""
else
    # Check if MongoDB is running
    if ! check_mongodb_running; then
        echo -e "${YELLOW}🔄 Starting MongoDB...${NC}"
        if command_exists brew; then
            brew services start mongodb/brew/mongodb-community > /dev/null 2>&1
            sleep 2
        fi

        if ! check_mongodb_running; then
            echo -e "${YELLOW}⚠️  MongoDB is not running. Backend may fail to start.${NC}"
            echo -e "${BLUE}Run: brew services start mongodb/brew/mongodb-community${NC}"
            echo ""
        else
            echo -e "${GREEN}✅ MongoDB is running${NC}"
        fi
    else
        echo -e "${GREEN}✅ MongoDB is running${NC}"
    fi
fi

echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
npm install

echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
cd splitwise-backend
npm install

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  No .env file found. Creating from .env.example...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Created .env file${NC}"
fi

cd ..

echo -e "${YELLOW}🔧 Starting backend server...${NC}"
cd splitwise-backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 5

echo -e "${YELLOW}🔧 Starting frontend development server...${NC}"
npm start &
FRONTEND_PID=$!

echo ""
echo -e "${GREEN}✅ Development environment started!${NC}"
echo -e "${GREEN}Frontend: http://localhost:4200${NC}"
echo -e "${GREEN}Backend: http://localhost:3000${NC}"
echo -e "${GREEN}Backend Health: http://localhost:3000/health${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}"

# Function to cleanup when script exits
cleanup() {
    echo -e "\n${YELLOW}🛑 Stopping servers...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}✅ Servers stopped.${NC}"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for processes
wait
