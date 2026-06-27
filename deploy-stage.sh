#!/bin/bash

# CMS Web Dev - Stage Deploy Script
# Usage: ./deploy-stage.sh

set -e

# Configuration
STAGE_URL="stage-branch.zunkireelabs.com"
COMPOSE_FILE="docker-compose.stage.yml"
CONTAINER_NAME="cms-web-stage"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting stage deployment...${NC}"

# Pre-flight: git safety checks
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${YELLOW}Current branch: ${CURRENT_BRANCH}${NC}"

if [ -n "$(git status --porcelain)" ]; then
    echo -e "${RED}Aborting: working tree has uncommitted changes.${NC}"
    echo -e "${RED}Commit, stash, or discard them before deploying.${NC}"
    git status --short
    exit 1
fi

echo -e "${YELLOW}Fetching from origin...${NC}"
git fetch --quiet origin "$CURRENT_BRANCH" || {
    echo -e "${RED}Aborting: failed to fetch origin/${CURRENT_BRANCH}.${NC}"
    exit 1
}

LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse "origin/${CURRENT_BRANCH}")
BASE=$(git merge-base HEAD "origin/${CURRENT_BRANCH}")

if [ "$LOCAL" = "$REMOTE" ]; then
    echo -e "${GREEN}Up to date with origin/${CURRENT_BRANCH}.${NC}"
elif [ "$LOCAL" = "$BASE" ]; then
    echo -e "${YELLOW}Behind origin/${CURRENT_BRANCH} — pulling (fast-forward only)...${NC}"
    git pull --ff-only origin "$CURRENT_BRANCH" || {
        echo -e "${RED}Aborting: fast-forward pull failed.${NC}"
        exit 1
    }
elif [ "$REMOTE" = "$BASE" ]; then
    echo -e "${RED}Aborting: local has commits not on origin/${CURRENT_BRANCH}.${NC}"
    echo -e "${RED}Push your commits first, then re-run.${NC}"
    exit 1
else
    echo -e "${RED}Aborting: local and origin/${CURRENT_BRANCH} have diverged.${NC}"
    echo -e "${RED}Reconcile manually (merge/rebase) before deploying.${NC}"
    exit 1
fi

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
    echo -e "${GREEN}Site live at: https://$STAGE_URL${NC}"
else
    echo -e "${RED}Container failed to start. Check logs:${NC}"
    docker compose -f $COMPOSE_FILE logs
    exit 1
fi
