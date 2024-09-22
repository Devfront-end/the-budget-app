#!/bin/bash

# Step 1: Fetch the latest changes from the main branch
echo "Fetching the latest changes from the main branch..."
git fetch origin main

# Step 2: Checkout to the new-feature branch
echo "Checking out to the new-feature branch..."
git checkout new-feature

# Step 3: Merge the main branch into the new-feature branch
echo "Merging the main branch into the new-feature branch..."
git merge origin/main

# Step 4: Resolve conflicts (if any)
echo "Resolving conflicts..."
git add client/node_modules/.cache/default-development/4.pack
git add client/node_modules/.cache/default-development/5.pack
git add client/node_modules/.cache/default-development/6.pack
git add client/node_modules/.cache/default-development/7.pack
git add client/node_modules/.cache/default-development/8.pack
git add client/node_modules/.cache/default-development/9.pack
git add client/node_modules/.cache/default-development/index.pack
git add client/node_modules/.cache/tsconfig.tsbuildinfo

# Commit the conflict resolution
echo "Committing conflict resolution..."
git commit -m "Resolve conflicts from merging main into new-feature"

# Step 5: Untrack the files from Git LFS
echo "Untracking files from Git LFS..."
git lfs untrack "client/node_modules/.cache/default-development/*.pack"
git lfs untrack "client/node_modules/.cache/tsconfig.tsbuildinfo"

# Step 6: Remove the files from the repository's index
echo "Removing files from the repository's index..."
git rm --cached client/node_modules/.cache/default-development/*.pack
git rm --cached client/node_modules/.cache/tsconfig.tsbuildinfo

# Step 7: Add the files to .gitignore
echo "Adding files to .gitignore..."
echo "client/node_modules/.cache/default-development/*.pack" >> .gitignore
echo "client/node_modules/.cache/tsconfig.tsbuildinfo" >> .gitignore

# Step 8: Commit the changes
echo "Committing the changes..."
git add .gitattributes .gitignore
git commit -m "Remove large files from Git LFS and add to .gitignore"

# Step 9: Push the changes to the new-feature branch
echo "Pushing the resolved changes to the new-feature branch..."
git push origin new-feature

# Output final git status
echo "Final git status:"
git status

echo "Merge process and conflict resolution completed!"