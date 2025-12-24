#!/bin/bash
# XRP HUD Launcher for Linux

# Navigate from platforms/linux/ up to project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"

cd "$PROJECT_DIR"
npm start
