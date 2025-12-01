#!/bin/bash

# Exit if any command fails
set -e

echo "🔄 Pulling latest code..."

echo "william@safetix.com"
echo "myloveEmi2003"

git pull origin $(git rev-parse --abbrev-ref HEAD)

echo "📦 Installing dependencies..."
composer install --no-interaction --prefer-dist --optimize-autoloader

echo "🗄️ Running migrations..."
php artisan migrate --force

echo "🧹 Clearing & caching Laravel..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Deployment finished successfully!"
