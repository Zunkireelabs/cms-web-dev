#!/bin/bash
# Manual dev deploy — pulls the latest :main image from GHCR and restarts.
# GitHub Actions handles building and pushing the image automatically on push to main.
# Usage: ./deploy.sh  (run from the project root on the VPS)
set -e
docker compose -f docker-compose.dev.yml pull
docker compose -f docker-compose.dev.yml up -d
docker ps --filter "name=cms-web-dev" --format "table {{.Names}}\t{{.Status}}"
