#!/bin/bash

# Step 1: Install Git LFS
echo "Installing Git LFS..."
brew install git-lfs

# Step 2: Initialize Git LFS
echo "Initializing Git LFS..."
git lfs install

# Step 3: Track large files with Git LFS
echo "Tracking large files with Git LFS..."
git lfs track "client/node_modules/.cache/default-development/*.pack"

# Step 4: Add .gitattributes to the repository
echo "Adding .gitattributes to the repository..."
git add .gitattributes
git commit -m "Track large files with Git LFS"

# Step 5: Push changes to the remote repository
echo "Pushing changes to the remote repository..."
git push origin main

# Step 6: Exclude node_modules from Jekyll build
echo "Excluding node_modules from Jekyll build..."
cat <<EOL >> _config.yml
# Exclude directories/files from being processed by Jekyll
exclude:
  - node_modules
  - vendor
  - README.md
  - Gemfile
  - Gemfile.lock
EOL

# Step 7: Commit the changes to _config.yml
echo "Committing changes to _config.yml..."
git add _config.yml
git commit -m "Exclude node_modules from Jekyll build"

# Step 8: Push the changes to the remote repository
echo "Pushing changes to the remote repository..."
git push origin main

echo "Setup complete!"