#!/bin/bash

# Script to help set up a GitHub repository for the PWA Check-in App

echo "=== GitHub Repository Setup for PWA Check-in App ==="
echo ""
echo "This script will help you set up a GitHub repository for your PWA Check-in App."
echo "Make sure you have a GitHub account and git is installed on your system."
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Error: git is not installed. Please install git first."
    exit 1
fi

# Check if the current directory is a git repository
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
    echo "Git repository initialized."
else
    echo "Git repository already exists."
fi

# Ask for GitHub username
read -p "Enter your GitHub username: " github_username

# Ask for repository name
read -p "Enter repository name (default: pwacheckin): " repo_name
repo_name=${repo_name:-pwacheckin}

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    echo "Creating .gitignore file..."
    cat > .gitignore << EOL
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
EOL
    echo ".gitignore file created."
fi

# Add all files to git
echo "Adding files to git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Initial commit"

# Create GitHub repository
echo ""
echo "Now you need to create a GitHub repository:"
echo "1. Go to https://github.com/new"
echo "2. Enter '${repo_name}' as the repository name"
echo "3. Make sure it's set to 'Public'"
echo "4. Do NOT initialize with README, .gitignore, or license"
echo "5. Click 'Create repository'"
echo ""
read -p "Press Enter after you've created the repository on GitHub..."

# Add GitHub remote
echo "Adding GitHub remote..."
git remote add origin https://github.com/${github_username}/${repo_name}.git

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "=== Setup Complete ==="
echo "Your PWA Check-in App is now on GitHub at: https://github.com/${github_username}/${repo_name}"
echo "GitHub Pages will be available at: https://${github_username}.github.io/${repo_name}/"
echo ""
echo "The GitHub Actions workflow will automatically deploy your app to GitHub Pages when you push to the main branch."
echo "It may take a few minutes for the first deployment to complete."
echo ""
echo "To check the status of the deployment, go to:"
echo "https://github.com/${github_username}/${repo_name}/actions"
echo ""
