#!/bin/bash

# PortfolioSync Environment Setup Script
# This script helps you set up your environment configuration

set -e

echo "🚀 PortfolioSync Environment Setup"
echo "=================================="
echo ""

# Check if .env.local already exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled. Your existing .env.local was not modified."
        exit 0
    fi
fi

# Copy the example file
echo "📋 Creating .env.local from .env.example..."
cp .env.example .env.local

echo "✅ .env.local created successfully!"
echo ""
echo "📝 Now you need to configure your environment variables:"
echo ""
echo "1️⃣  Open .env.local in your editor"
echo "2️⃣  Update VITE_GITHUB_CLIENT_ID with your GitHub OAuth App Client ID"
echo "3️⃣  Adjust other values if needed (ports, API URL, etc.)"
echo ""
echo "💡 Need help getting a GitHub Client ID?"
echo "   Visit: https://github.com/settings/developers"
echo "   Or read: ENV_SETUP.md"
echo ""

# Prompt for GitHub Client ID
read -p "Would you like to enter your GitHub Client ID now? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter your GitHub Client ID: " github_client_id
    
    if [ ! -z "$github_client_id" ]; then
        # Update the .env.local file with the GitHub Client ID
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s/VITE_GITHUB_CLIENT_ID=.*/VITE_GITHUB_CLIENT_ID=$github_client_id/" .env.local
        else
            # Linux
            sed -i "s/VITE_GITHUB_CLIENT_ID=.*/VITE_GITHUB_CLIENT_ID=$github_client_id/" .env.local
        fi
        echo "✅ GitHub Client ID updated in .env.local"
    fi
fi

echo ""
echo "🎉 Setup complete! You can now run:"
echo "   npm run dev"
echo ""
echo "📖 For more information, see ENV_SETUP.md"
