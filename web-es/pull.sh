#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="/var/www/mega-wall-react"
DIST_DIR="$APP_DIR/dist"
LOG_FILE="/var/log/pull_mega_wall.log"
LOCK_FILE="/tmp/pull_mega_wall.lock"

log() { echo "$(date '+%F %T') | $*" | tee -a "$LOG_FILE"; }

log "william@safetix.com"
log "myloveEmi2003"

# מנע ריצה כפולה
exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  log "Another deploy is running. Exiting."
  exit 0
fi

log "=== Deploy start ==="
cd "$APP_DIR"

# קבע ענף: פרמטר ראשון -> אחרת HEAD של origin -> אחרת main/master
BRANCH="${1:-}"
if [[ -z "$BRANCH" ]]; then
  BRANCH="$(git symbolic-ref --quiet --short refs/remotes/origin/HEAD 2>/dev/null | sed 's#^origin/##' || true)"
fi
if [[ -z "$BRANCH" ]]; then
  if git show-ref --verify --quiet refs/heads/main; then BRANCH="main";
  elif git show-ref --verify --quiet refs/heads/master; then BRANCH="master";
  else BRANCH="main"; fi
fi
log "Using branch: $BRANCH"

# משיכה נקייה
git fetch --all --prune
git checkout -B "$BRANCH" "origin/$BRANCH"
git reset --hard "origin/$BRANCH"
log "Git updated to origin/$BRANCH @ $(git rev-parse --short HEAD)"

# התקנת חבילות לבילד
if [[ -f package-lock.json ]]; then
  log "Running npm ci..."
  npm ci --no-audit --no-fund
else
  log "Running npm install..."
  npm install --no-audit --no-fund
fi

# Build
export NODE_ENV=production
log "Running build..."
npm run build

# ולידציה והרשאות
if [[ ! -f "$DIST_DIR/index.html" ]]; then
  log "ERROR: dist/index.html not found after build"; exit 1
fi
chown -R www-data:www-data "$DIST_DIR"

# בדיקת Nginx וטעינה מחדש
nginx -t
systemctl reload nginx
log "Nginx reloaded"

log "=== Deploy done successfully ==="