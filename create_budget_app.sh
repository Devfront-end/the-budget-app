#!/bin/bash

# Create client directory structure
mkdir -p client/public client/src/components
touch client/public/index.html
touch client/src/App.tsx client/src/index.tsx client/src/index.css
touch client/src/components/{Header,IncomeSection,ExpenseSection,RemainingBalance,ExpenseList,ExpenseChart}.tsx
touch client/package.json client/tsconfig.json client/tailwind.config.js client/postcss.config.js

# Create server directory structure
mkdir -p server/src/{config,controllers,models,routes}
touch server/src/config/database.ts
touch server/src/controllers/{incomeController,expenseController}.ts
touch server/src/models/{Income,Expense}.ts
touch server/src/routes/{incomeRoutes,expenseRoutes}.ts
touch server/src/app.ts server/src/server.ts
touch server/package.json server/tsconfig.json

# Create README
touch README.md

echo "Project structure created successfully!"

