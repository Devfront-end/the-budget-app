#!/bin/bash

# Navigate to the project root directory
cd "$(dirname "$0")"

# Create or update the main component files
mkdir -p src/components
touch src/App.tsx
touch src/components/ExpenseChart.tsx
touch src/components/ExpenseList.tsx
touch src/components/ExpenseSection.tsx
touch src/components/Header.tsx
touch src/components/IncomeSection.tsx
touch src/components/RemainingBalance.tsx

# Update the main index file
touch src/index.tsx

# Update the TypeScript configuration file
touch tsconfig.json

echo "Files created or updated successfully!"

# Optional: Add basic content to component files
for file in src/components/*.tsx; do
    if [ ! -s "$file" ]; then
        echo "import React from 'react';

const ${file##*/} = () => {
  return (
    <div>
      {/* Add your component logic here */}
    </div>
  );
};

export default ${file##*/};" > "$file"
    fi
done

echo "Basic content added to empty component files."

# Print a list of updated files
echo "Updated files:"
ls -1 src/App.tsx src/components/*.tsx src/index.tsx tsconfig.json