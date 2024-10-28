#!/bin/bash

# Define the project directories
SRC_DIR="client/src"

# Update the App.tsx file
cat <<EOF > $SRC_DIR/App.tsx
import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import ExpensesChartPage from './components/ExpensesChartPage';

interface IncomeItem {
  description: string;
  amount: number;
}

interface ExpenseItem {
  description: string;
  amount: number;
  date: string;
}

const App: React.FC = () => {
  const [incomeCategories, setIncomeCategories] = useState<string[]>(['Salaire net', 'Primes', "Prime d'activité", 'Freelance', 'Investissements']);
  const [expenseCategories, setExpenseCategories] = useState<string[]>(['Loyer', 'Courses', 'Transport', 'Loisirs', 'Santé']);
  const [income, setIncome] = useState<IncomeItem[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [newIncome, setNewIncome] = useState<{ description: string; amount: string }>({ description: '', amount: '' });
  const [newExpense, setNewExpense] = useState<{ description: string; amount: string; date: string }>({ description: '', amount: '', date: '' });
  const [newCategory, setNewCategory] = useState<string>('');
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remainingMoney = totalIncome - totalExpenses;

  const handleAddIncome = () => {
    if (newIncome.description && newIncome.amount) {
      setIncome([...income, { ...newIncome, amount: Number(newIncome.amount) }]);
      setNewIncome({ description: '', amount: '' });
    }
  };

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.date) {
      setExpenses([...expenses, { ...newExpense, amount: Number(newExpense.amount) }]);
      setNewExpense({ description: '', amount: '', date: '' });
    }
  };

  const handleAddCategory = (type: 'income' | 'expense') => {
    if (newCategory) {
      if (type === 'income') {
        setIncomeCategories([...incomeCategories, newCategory]);
      } else {
        setExpenseCategories([...expenseCategories, newCategory]);
      }
      setNewCategory('');
    }
  };

  return (
    <div className={\`min-h-screen \${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}\`}>
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Budget App</h1>
        <nav>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/expenses-chart">Répartition des dépenses</Link>
        </nav>
        {isDarkTheme ? (
          <Sun className="cursor-pointer" onClick={toggleTheme} />
        ) : (
          <Moon className="cursor-pointer" onClick={toggleTheme} />
        )}
      </header>

      <Routes>
        <Route path="/" element={
          <main className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Entrées d'argent</h2>
                <div className="flex flex-col space-y-2">
                  <select
                    value={newIncome.description}
                    onChange={(e) => setNewIncome({...newIncome, description: e.target.value})}
                    className="p-2 border rounded"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {incomeCategories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={newIncome.amount}
                    onChange={(e) => setNewIncome({...newIncome, amount: e.target.value})}
                    placeholder="Montant"
                    className="p-2 border rounded"
                  />
                  <button onClick={handleAddIncome} className="bg-blue-500 text-white px-4 py-2 rounded">+ Ajouter</button>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Nouvelle catégorie"
                    className="p-2 border rounded mr-2"
                  />
                  <button onClick={() => handleAddCategory('income')} className="bg-green-500 text-white px-4 py-2 rounded">+ Catégorie</button>
                </div>
                <p className="mt-4">Total des entrées: {totalIncome.toFixed(2)} €</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Ajouter une dépense</h2>
                <div className="flex flex-col space-y-2">
                  <select
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    className="p-2 border rounded"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {expenseCategories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    placeholder="Montant"
                    className="p-2 border rounded"
                  />
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                    className="p-2 border rounded"
                  />
                  <button onClick={handleAddExpense} className="bg-red-500 text-white px-4 py-2 rounded">+ Ajouter</button>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Nouvelle catégorie"
                    className="p-2 border rounded mr-2"
                  />
                  <button onClick={() => handleAddCategory('expense')} className="bg-green-500 text-white px-4 py-2 rounded">+ Catégorie</button>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-green-100 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Argent restant: {remainingMoney.toFixed(2)} €</h2>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Sorties d'argent</h2>
              <input
                type="text"
                placeholder="Rechercher des dépenses..."
                className="w-full p-2 border rounded mb-4"
              />
              {/* Here you can add a list of expenses */}
            </div>
          </main>
        } />
        <Route path="/expenses-chart" element={<ExpensesChartPage expenses={expenses} isDarkTheme={isDarkTheme} />} />
      </Routes>
    </div>
  );
};

export default App;
EOF

# Update the index.tsx file
cat <<EOF > $SRC_DIR/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/the-budget-app">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
EOF

# Check for TypeScript errors
echo "Checking for TypeScript errors..."
npx tsc --noEmit

# Start the development server
echo "Starting the development server..."
npm start