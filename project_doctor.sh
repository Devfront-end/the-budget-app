#!/bin/bash

# Check if all necessary directories exist
directories=(
  "client"
  "client/public"
  "client/src"
  "client/src/components"
  "server"
  "server/src"
  "server/src/config"
  "server/src/controllers"
  "server/src/models"
  "server/src/routes"
)

for dir in "${directories[@]}"; do
  if [ ! -d "$dir" ]; then
    echo "Directory $dir is missing. Creating it now."
    mkdir -p "$dir"
  fi
done

# Check if all necessary files exist
files=(
  "client/public/index.html"
  "client/src/App.tsx"
  "client/src/index.tsx"
  "client/src/index.css"
  "client/src/components/Header.tsx"
  "client/src/components/IncomeSection.tsx"
  "client/src/components/ExpenseSection.tsx"
  "client/src/components/RemainingBalance.tsx"
  "client/src/components/ExpenseList.tsx"
  "client/src/components/ExpenseChart.tsx"
  "client/package.json"
  "client/tsconfig.json"
  "client/tailwind.config.js"
  "client/postcss.config.js"
  "server/src/config/database.ts"
  "server/src/controllers/incomeController.ts"
  "server/src/controllers/expenseController.ts"
  "server/src/models/Income.ts"
  "server/src/models/Expense.ts"
  "server/src/routes/incomeRoutes.ts"
  "server/src/routes/expenseRoutes.ts"
  "server/src/app.ts"
  "server/src/server.ts"
  "server/package.json"
  "server/tsconfig.json"
  "README.md"
)

for file in "${files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "File $file is missing. Creating an empty file."
    touch "$file"
  fi
done

echo "Project structure check complete. All necessary directories and files are present."

