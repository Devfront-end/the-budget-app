import React, { useState } from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import { Sun, Moon, Trash } from "lucide-react";
import { CSVLink } from "react-csv";
import ExpensesChartPage from "./components/ExpensesChartPage";
import BudgetSummary from "./components/BudgetSummary";
import WishlistPage from "./components/WishlistPage";
import Savings from "./components/Savings";
import { LoginForm } from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { FaUserCircle } from "react-icons/fa";
import Modal from "./components/Modal";
import csvIcon from "./assets/img/csv-icon.png";
import googleSheetsIcon from "./assets/img/google-sheets-icon.png";
import { ExpenseItem } from "./types";
import MySubscriptionsPage from "./components/MySubscriptionsPage";
import MyIncomePage from "./components/MyIncomePage";
import DashboardPage from "./components/DashboardPage";  // Import new components

interface AppProps {
  expenses: ExpenseItem[];
  isDarkTheme: boolean;
}

const App: React.FC<AppProps> = ({
  expenses: initialExpenses,
  isDarkTheme: initialIsDarkTheme,
}) => {
  const [incomeCategories, setIncomeCategories] = useState<string[]>([
    'Salaire net', 'Primes', "Prime d'activité", 'Freelance', 'Investissements', 'ARE'
  ]);
  const [expenseCategories, setExpenseCategories] = useState<string[]>(['Loyer', 'Courses', 'Transport', 'Loisirs', 'Santé']);
  const [income, setIncome] = useState<ExpenseItem[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);
  const [newIncome, setNewIncome] = useState<{ description: string; amount: string; date: string }>({ description: '', amount: '', date: '' });
  const [newExpense, setNewExpense] = useState<{ description: string; amount: string; date: string }>({ description: '', amount: '', date: '' });
  const [newCategory, setNewCategory] = useState<string>('');
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(initialIsDarkTheme);
  const [showAuthModal, setShowAuthModal] = useState(false); // Modal visibility state
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup forms

  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal); // Toggle modal visibility
  };

  const toggleAuthForm = () => {
    setIsLogin(!isLogin); // Toggle between login and signup forms
  };

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  const handleAddIncome = () => {
    if (newIncome.description && newIncome.amount && newIncome.date) {
      const newIncomeItem: ExpenseItem = {
        id: `${income.length + 1}`,
        description: newIncome.description,
        amount: Number(newIncome.amount),
        date: newIncome.date,
        type: 'income', // Add the type property
      };
      setIncome([...income, newIncomeItem]);
      setNewIncome({ description: '', amount: '', date: '' });
    }
  };

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.date) {
      const newExpenseItem: ExpenseItem = {
        id: `${expenses.length + 1}`,
        description: newExpense.description,
        amount: Number(newExpense.amount),
        date: newExpense.date,
        type: 'expense', // Add the type property
      };
      setExpenses([...expenses, newExpenseItem]);
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
          <Link to="/expenses-chart" className="mr-4">Expenses</Link>
          <Link to="/wishlist" className="mr-4">Wishlist</Link>
          <Link to="/savings" className="mr-4">Savings</Link>
          {/* Add new links to the navbar */}
          <Link to="/subscriptions" className="mr-4">My Subscriptions</Link>
          <Link to="/income" className="mr-4">My Income</Link>
          <Link to="/dashboard" className="mr-4">Dashboard</Link>
        </nav>
        <div className="flex items-center">
          <FaUserCircle size={24} className="mr-2 cursor-pointer" onClick={toggleAuthModal} />
          <span className="cursor-pointer" onClick={toggleAuthModal}>Connect</span>
        </div>
        {isDarkTheme ? (
          <Sun className="cursor-pointer" onClick={toggleTheme} />
        ) : (
          <Moon className="cursor-pointer" onClick={toggleTheme} />
        )}
      </header>
      <Routes>
        <Route path="/" element={<main className="container mx-auto p-4">{/* Your main component logic */}</main>} />
        <Route path="/expenses-chart" element={<ExpensesChartPage expenses={expenses} isDarkTheme={isDarkTheme} />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/savings" element={<Savings balance={balance} />} />
        {/* Add new routes */}
        <Route path="/subscriptions" element={<MySubscriptionsPage />} />
        <Route path="/income" element={<MyIncomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Modal isOpen={showAuthModal} onClose={toggleAuthModal}>
        {isLogin ? (
          <LoginForm onSwitchForm={toggleAuthForm} />
        ) : (
          <SignUpForm onSwitchForm={toggleAuthForm} />
        )}
      </Modal>
    </div>
  );
};

export default App;