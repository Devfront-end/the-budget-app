#!/bin/bash

# Update .gitignore
echo "Updating .gitignore..."
cat << EOF >> .gitignore
node_modules/
.cache/
EOF

# Remove large files from Git history
echo "Removing large files from Git history..."
git filter-branch --force --index-filter \
"git rm --cached --ignore-unmatch client/node_modules/.cache/default-development/19.pack client/node_modules/.cache/default-development/1.pack_" \
--prune-empty --tag-name-filter cat -- --all

# Clean up refs
echo "Cleaning up refs..."
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now

# Set up Git LFS
echo "Setting up Git LFS..."
git lfs install
git lfs track "*.pack"
git add .gitattributes

# Commit changes
echo "Committing changes..."
git add .
git commit -m "Remove large files, update .gitignore, and set up Git LFS"

# Force push
echo "Force pushing changes..."
git push origin --force --all

echo "Script completed. Please check the output for any errors."