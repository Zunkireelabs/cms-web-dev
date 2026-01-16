#!/bin/bash

# CMS Web Dev - Deploy Script
# Usage: ./deploy.sh

set -e

# Configuration
DEV_URL="cms-dev.zunkireelabs.com"
COMPOSE_FILE="docker-compose.dev.yml"
CONTAINER_NAME="cms-web-dev"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting dev deployment...${NC}"

# Step 1: Build Next.js
echo -e "${YELLOW}Building Next.js application...${NC}"
npm run build

# Step 2: Check if .next directory exists
if [ ! -d ".next" ]; then
    echo -e "${RED}Build failed - '.next' directory not found${NC}"
    exit 1
fi

# Step 3: Build Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
docker compose -f $COMPOSE_FILE build --no-cache

# Step 4: Stop existing container (if running)
echo -e "${YELLOW}Restarting container...${NC}"
docker compose -f $COMPOSE_FILE down 2>/dev/null || true

# Step 5: Start new container
docker compose -f $COMPOSE_FILE up -d

# Step 6: Verify container is running
sleep 2
if docker ps | grep -q $CONTAINER_NAME; then
    echo -e "${GREEN}Deployment complete!${NC}"
    echo -e "${GREEN}Site live at: https://$DEV_URL${NC}"
else
    echo -e "${RED}Container failed to start. Check logs:${NC}"
    docker compose -f $COMPOSE_FILE logs
    exit 1
fi
