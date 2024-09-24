import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Sun, Moon, Download, Trash } from 'lucide-react';
import { CSVLink } from 'react-csv';
import ExpensesChartPage from './components/ExpensesChartPage';
import BudgetSummary from './components/BudgetSummary';
import WishlistPage from './components/WishlistPage';
import Savings from './components/Savings';

interface ExpenseItem {
  description: string;
  amount: number;
  date: string;
}

interface AppProps {
  expenses: ExpenseItem[];
  isDarkTheme: boolean;
}

const App: React.FC<AppProps> = ({ expenses: initialExpenses, isDarkTheme: initialIsDarkTheme }) => {
  const [incomeCategories, setIncomeCategories] = useState<string[]>(['Salaire net', 'Primes', "Prime d'activité", 'Freelance', 'Investissements', 'ARE']);
  const [expenseCategories, setExpenseCategories] = useState<string[]>(['Loyer', 'Courses', 'Transport', 'Loisirs', 'Santé']);
  const [income, setIncome] = useState<ExpenseItem[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);
  const [newIncome, setNewIncome] = useState<{ description: string; amount: string }>({ description: '', amount: '' });
  const [newExpense, setNewExpense] = useState<{ description: string; amount: string; date: string }>({ description: '', amount: '', date: '' });
  const [newCategory, setNewCategory] = useState<string>('');
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(initialIsDarkTheme);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  const handleAddIncome = () => {
    if (newIncome.description && newIncome.amount) {
      const newIncomeItem: ExpenseItem = {
        ...newIncome,
        amount: Number(newIncome.amount),
        date: new Date().toISOString(),
      };
      setIncome([...income, newIncomeItem]);
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

  const csvHeaders = [
    { label: 'Description', key: 'description' },
    { label: 'Amount', key: 'amount' },
    { label: 'Date', key: 'date' }
  ];

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Budget App</h1>
        <nav>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/expenses-chart">Expenses</Link>
          <Link to="/wishlist" className="ml-4">Wishlist</Link>
          <Link to="/savings" className="ml-4">Savings</Link>
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
              <div className={`p-4 rounded-lg shadow ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <h2 className="text-xl font-semibold mb-4">Entrées d'argent</h2>
                <div className="flex flex-col space-y-2">
                  <select
                    value={newIncome.description}
                    onChange={(e) => setNewIncome({...newIncome, description: e.target.value})}
                    className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}
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
                    className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}
                  />
                  <button onClick={handleAddIncome} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ Ajouter</button>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Nouvelle catégorie"
                    className={`p-2 border rounded mr-2 ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}
                  />
                  <button onClick={() => handleAddCategory('income')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">+ Catégorie</button>
                </div>
              </div>
              <div className={`p-4 rounded-lg shadow ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <h2 className="text-xl font-semibold mb-4">Ajouter une dépense</h2>
                <div className="flex flex-col space-y-2">
                  <select
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}
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
                    className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}
                  />
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                    className={`p-2 border rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}
                  />
                  <button onClick={handleAddExpense} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">+ Ajouter</button>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Nouvelle catégorie"
                    className={`p-2 border rounded mr-2 ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}
                  />
                  <button onClick={() => handleAddCategory('expense')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">+ Catégorie</button>
                </div>
              </div>
            </div>

            {/* Budget Summary */}
            <div className="container mx-auto mt-8">
              <BudgetSummary totalIncome={totalIncome} totalExpenses={totalExpenses} />
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Sorties d'argent</h2>
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  placeholder="Rechercher des dépenses..."
                  className="w-full p-2 border rounded"
                  // You can add functionality to filter expenses here
                />
                <CSVLink
                  data={expenses}
                  headers={csvHeaders}
                  filename="expenses.csv"
                  className="ml-4 text-blue-500 hover:text-blue-700"
                >
                  <Download className="w-6 h-6" />
                </CSVLink>
              </div>
              <ul>
                {expenses.map((expense, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div>
                      <span className="font-semibold">{expense.description}</span>
                      <span className="text-gray-500 ml-2">{expense.date}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-red-500">{expense.amount} €</span>
                      <button
                        onClick={() => {
                          const updatedExpenses = expenses.filter((_, i) => i !== index);
                          setExpenses(updatedExpenses);
                        }}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        <Trash className="w-6 h-6" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </main>
        } />
        <Route path="/expenses-chart" element={<ExpensesChartPage expenses={expenses} isDarkTheme={isDarkTheme} />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/savings" element={<Savings balance={balance} />} />
      </Routes>
    </div>
  );
};

export default App;