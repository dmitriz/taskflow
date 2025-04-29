#!/usr/bin/env bash
set -euo pipefail
# WARNING: This script will overwrite package.json in the current directory.
# Use with caution and ensure you have committed or backed up any existing package.json.

# Navigate to the current folder (taskflow)
cd "$(dirname "$0")"
# Backup existing files before overwrite
if [ -f package.json ]; then cp package.json package.json.bak; echo "Backup created: package.json.bak"; fi
if [ -f index.js ]; then cp index.js index.js.bak; echo "Backup created: index.js.bak"; fi

# Initialize Node.js project if not already initialized
if [ ! -f package.json ]; then
    echo "Initializing npm project..."
    npm init -y
fi

# Overwrite package.json with correct package info
cat << 'EOF' > package.json
{
  "name": "taskflow",
  "version": "0.1.0",
  "description": "Task capturing and email processing utilities.",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/dmitriz/taskflow.git"
  },
  "keywords": [
    "tasks",
    "automation",
    "capture",
    "email"
  ],
  "author": "dmitriz",
  "license": "MIT",
  "dependencies": {
    "googleapis": "^latest"
  }
}
EOF

# Create index.js if it does not exist (entry point)
if [ ! -f index.js ]; then
    echo "// Entry point for taskflow package" > index.js
    echo "module.exports = {};" >> index.js
fi

# Install dependencies
npm install

# Stage and commit changes
git add package.json index.js
# Signing off commit; ensure commits are intentional
read -p "Commit message [Prepare taskflow as installable GitHub package]: " msg
msg=${msg:-"Prepare taskflow as installable GitHub package"}
git commit -m "$msg"

echo ""
echo "Setup complete! Taskflow is now a valid Node.js package."
echo "You can install it in another project with:"
echo "  npm install git+https://github.com/dmitriz/taskflow.git"