#!/bin/bash

# Define file paths
EXPENSES_CHART_PAGE_PATH="./client/src/components/ExpensesChartPage.tsx"
APP_PATH="./client/src/App.tsx"

# Check if ExpensesChartPage.tsx has a named export and update it to a default export
if grep -q "export const ExpensesChartPage" "$EXPENSES_CHART_PAGE_PATH"; then
  echo "Updating ExpensesChartPage.tsx to use default export..."
  sed -i '' 's/export const ExpensesChartPage/const ExpensesChartPage/' "$EXPENSES_CHART_PAGE_PATH"
  echo "export default ExpensesChartPage;" >> "$EXPENSES_CHART_PAGE_PATH"
else
  echo "ExpensesChartPage.tsx already has a default export or no export found."
fi

# Ensure App.tsx imports ExpensesChartPage as a default export
if grep -q "import ExpensesChartPage from './components/ExpensesChartPage';" "$APP_PATH"; then
  echo "App.tsx already imports ExpensesChartPage as a default export."
else
  echo "Updating App.tsx to import ExpensesChartPage as a default export..."
  sed -i '' 's/import { ExpensesChartPage } from .\/components\/ExpensesChartPage/import ExpensesChartPage from .\/components\/ExpensesChartPage/' "$APP_PATH"
fi

echo "Script execution completed."