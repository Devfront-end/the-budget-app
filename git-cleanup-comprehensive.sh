#!/bin/bash

set -e

# Navigate to the project directory
cd /Users/juleseulalie/the-budget-app

# Update .gitignore
echo "Updating .gitignore..."
cat << EOF > .gitignore
node_modules/
.cache/
*.pack
*.pack_
EOF

# Set up Git LFS
echo "Setting up Git LFS..."
git lfs install
git lfs track "*.pack"
git lfs track "*.pack_"
git add .gitattributes

# Remove large files from Git history
echo "Removing large files from Git history..."
git filter-branch --force --index-filter \
'git rm -r --cached --ignore-unmatch client/node_modules .cache' \
--prune-empty --tag-name-filter cat -- --all

# Clean up refs
echo "Cleaning up refs..."
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now

# Commit changes
echo "Committing changes..."
git add .
git commit -m "Remove large files, update .gitignore, and set up Git LFS" || true

# Force push changes
echo "Force pushing changes..."
git push origin --force --all

# Manual cleanup of node_modules cache
echo "Manually removing node_modules cache..."
rm -rf client/node_modules/.cache

# Commit and push again
echo "Committing and pushing manual cleanup..."
git add .
git commit -m "Remove node_modules cache" || true
git push origin --force --all

echo "Script completed. Please check the output for any errors."