#!/bin/bash

# Exit immediately if a command fails
set -e

# Check if commit message was provided
if [ -z "$1" ]; then
  echo "❌ Please provide a commit message"
  echo "Usage: ./git-push.sh \"your commit message\""
  exit 1
fi

# Add changes
git add .

# Commit with the given message
git commit -m "$1"


echo "william@safetix.com"
echo "myloveEmi2003"

# Push to the current branch
git push origin $(git rev-parse --abbrev-ref HEAD)

echo "✅ Changes pushed successfully!"



