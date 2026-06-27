#!/bin/bash
# Manual stage deploy — pulls the latest :stage image from GHCR and restarts.
# GitHub Actions handles building and pushing the image automatically on push to stage.
# Usage: ./deploy-stage.sh  (run from the project root on the VPS)
set -e
docker compose -f docker-compose.stage.yml pull
docker compose -f docker-compose.stage.yml up -d
docker ps --filter "name=cms-web-stage" --format "table {{.Names}}\t{{.Status}}"
