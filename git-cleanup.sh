#!/bin/bash

set -e

echo "Updating .gitignore..."
cat << EOF > .gitignore
node_modules/
.cache/
*.pack
*.pack_
EOF

echo "Setting up Git LFS..."
git lfs install
git lfs track "*.pack"
git lfs track "*.pack_"
git add .gitattributes

echo "Removing large files from Git history..."
git filter-branch --force --index-filter \
'git rm -r --cached --ignore-unmatch client/node_modules .cache' \
--prune-empty --tag-name-filter cat -- --all

echo "Cleaning up refs..."
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now

echo "Committing changes..."
git add .
git commit -m "Remove large files, update .gitignore, and set up Git LFS" || true

echo "Force pushing changes..."
git push origin --force --all

echo "Script completed. Please check the output for any errors."