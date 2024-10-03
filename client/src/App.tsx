import React, { useState } from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import { Sun, Moon, Trash } from "lucide-react";
import { CSVLink } from "react-csv";
import ExpensesChartPage from "./components/ExpensesChartPage";
import BudgetSummary from "./components/BudgetSummary";
import WishlistPage from "./components/WishlistPage";
import Savings from "./components/Savings";
import { LoginForm } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";
import { FaUserCircle } from "react-icons/fa";
import Modal from "./components/Modal";
import { ExpenseItem } from "./types";
import MySubscriptionsPage from "./components/MySubscriptionsPage";
import MyIncomePage from "./components/MyIncomePage";
import DashboardPage from "./components/DashboardPage"; // Import the new components

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
        ...newIncome,
        amount: Number(newIncome.amount),
      };
      setIncome([...income, newIncomeItem]);
      setNewIncome({ description: '', amount: '', date: '' });
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
          <Link to="/dashboard" className="ml-4">Dashboard</Link> {/* New Link */}
          <Link to="/expenses-chart" className="ml-4">Expenses</Link>
          <Link to="/budget-summary" className="ml-4">Budget Summary</Link>
          <Link to="/wishlist" className="ml-4">Wishlist</Link>
          <Link to="/savings" className="ml-4">Savings</Link>
          <Link to="/mysubscriptions" className="ml-4">My Subscriptions</Link>
          <Link to="/myincome" className="ml-4">My Income</Link>
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
      {/* Main content */}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Default to Dashboard */}
        <Route path="/dashboard" element={<DashboardPage totalIncome={totalIncome} totalExpenses={totalExpenses} balance={balance} />} />
        <Route path="/expenses-chart" element={<ExpensesChartPage expenses={expenses} isDarkTheme={isDarkTheme} />} />
        <Route path="/budget-summary" element={<BudgetSummary totalIncome={totalIncome} totalExpenses={totalExpenses} />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/savings" element={<Savings balance={balance} />} />
        <Route path="/login" element={<LoginForm onSwitchForm={toggleAuthForm} />} />
        <Route path="/signup" element={<SignUpForm onSwitchForm={toggleAuthForm} />} />
        <Route path="/mysubscriptions" element={<MySubscriptionsPage subscriptions={expenses.filter(e => e.description.includes("Subscription"))} />} />
        <Route path="/myincome" element={<MyIncomePage income={income} />} />
        <Route path="*" element={<Navigate to="/dashboard" />} /> {/* Catch-all route for redirection */}
      </Routes>

      {/* Authentication Modal */}
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
