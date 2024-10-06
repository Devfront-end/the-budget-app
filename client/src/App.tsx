import React, { useState } from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { CSVLink } from "react-csv";
import ExpensesChartPage from "./components/ExpensesChartPage";
import BudgetSummary from "./components/BudgetSummary";
import WishlistPage from "./components/WishlistPage";
import Savings from "./components/Savings";
import { LoginForm } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";
import { FaUserCircle } from "react-icons/fa";
import Modal from "./components/Modal";
import csvIcon from "./assets/img/csv-icon.png";
import googleSheetsIcon from "./assets/img/google-sheets-icon.png";
import { ExpenseItem } from "./types";
import MySubscriptionsPage from "./components/MySubscriptionsPage";
import MyIncomePage from "./components/MyIncomePage";
import DashboardPage from "./components/DashboardPage";

interface AppProps {
  expenses: ExpenseItem[];
  isDarkTheme: boolean;
}

interface ExtendedExpenseItem extends ExpenseItem {
  frequency: "monthly" | "yearly";
}

const App: React.FC<AppProps> = ({ expenses: initialExpenses, isDarkTheme: initialIsDarkTheme }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(initialIsDarkTheme);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);
  const [income, setIncome] = useState<ExpenseItem[]>([]);
  const [newIncome, setNewIncome] = useState<{ description: string; amount: string; date: string }>({ description: "", amount: "", date: "" });
  const [newExpense, setNewExpense] = useState<{ description: string; amount: string; date: string }>({ description: "", amount: "", date: "" });
  const [newCategory, setNewCategory] = useState<string>("");
  const [incomeCategories, setIncomeCategories] = useState<string[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<string[]>([]);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);
  const toggleAuthModal = () => setShowAuthModal(!showAuthModal);
  const toggleAuthForm = () => setIsLogin(!isLogin);

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;
  const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

  const handleAddIncome = () => {
    if (newIncome.description && newIncome.amount && newIncome.date) {
      const newIncomeItem: ExpenseItem = {
        id: generateUniqueId(),
        description: newIncome.description,
        amount: Number(newIncome.amount),
        date: newIncome.date,
        type: 'income',
      };
      setIncome([...income, newIncomeItem]);
      setNewIncome({ description: "", amount: "", date: "" });
    }
  };

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.date) {
      const newExpenseItem: ExpenseItem = {
        id: generateUniqueId(),
        description: newExpense.description,
        amount: Number(newExpense.amount),
        date: newExpense.date,
        type: 'expense',
      };
      setExpenses([...expenses, newExpenseItem]);
      setNewExpense({ description: "", amount: "", date: "" });
    }
  };

  const handleAddCategory = (type: "income" | "expense") => {
    if (newCategory) {
      if (type === "income") {
        setIncomeCategories([...incomeCategories, newCategory]);
      } else {
        setExpenseCategories([...expenseCategories, newCategory]);
      }
      setNewCategory("");
    }
  };

  const onCancelSubscription = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const csvHeaders = [
    { label: "Description", key: "description" },
    { label: "Amount", key: "amount" },
    { label: "Date", key: "date" },
  ];

  const recentTransactions = [...income, ...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className={`min-h-screen ${isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Budget App</h1>
        <nav>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/expenses-chart">Expenses</Link>
          <Link to="/wishlist" className="ml-4">Wishlist</Link>
          <Link to="/savings" className="ml-4">Savings</Link>
          <Link to="/subscriptions" className="ml-4">Subscriptions</Link>
          <Link to="/income" className="ml-4">My Income</Link>
          <Link to="/dashboard" className="ml-4">Dashboard</Link>
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
        <Route
          path="/"
          element={
            <main className="container mx-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg shadow ${isDarkTheme ? "bg-gray-800" : "bg-gray-200"}`}>
                  <h2 className="text-xl font-semibold mb-4">Entrées d'argent</h2>
                  <div className="flex flex-col space-y-2">
                    <select
                      value={newIncome.description}
                      onChange={(e) => setNewIncome({ ...newIncome, description: e.target.value })}
                      className={`p-2 border rounded ${isDarkTheme ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {incomeCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={newIncome.amount}
                      onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
                      placeholder="Montant"
                      className={`p-2 border rounded ${isDarkTheme ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}
                    />
                    <input
                      type="date"
                      value={newIncome.date}
                      onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
                      className={`p-2 border rounded ${isDarkTheme ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}
                    />
                    <button onClick={handleAddIncome} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      + Ajouter
                    </button>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Nouvelle catégorie"
                      className={`p-2 border rounded ${isDarkTheme ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}
                    />
                    <button onClick={() => handleAddCategory("income")} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                      + Catégorie
                    </button>
                  </div>
                  <h3 className="mt-4 font-semibold">Liste des entrées</h3>
                  <ul>
                    {income.map((item, index) => (
                      <li key={index} className="flex justify-between py-2">
                        <span>{item.description}</span>
                        <span>{item.date}</span>
                        <span className="text-green-500">{item.amount} €</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`p-4 rounded-lg shadow ${isDarkTheme ? "bg-gray-800" : "bg-gray-200"}`}>
                  <h2 className="text-xl font-semibold mb-4">Ajouter une dépense</h2>
                  <div className="flex flex-col space-y-2">
                    <select
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                      className={`p-2 border rounded ${isDarkTheme ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {expenseCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                      placeholder="Montant"
                      className={`p-2 border rounded ${isDarkTheme ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}
                    />
                    <input
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                      className={`p-2 border rounded ${isDarkTheme ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}
                    />
                    <button onClick={handleAddExpense} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                      + Ajouter
                    </button>
                  </div>
                  <div className="mt-2 flex items-center space-x-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Nouvelle catégorie"
                      className={`p-2 border rounded flex-grow ${isDarkTheme ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}
                    />
                    <button onClick={() => handleAddCategory("expense")} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                      + Catégorie
                    </button>
                    <CSVLink data={expenses} headers={csvHeaders} filename="expenses.csv" className="inline-block">
                      <img src={csvIcon} alt="CSV Icon" className="w-6 h-6" />
                    </CSVLink>
                    <button className="inline-block">
                      <img src={googleSheetsIcon} alt="Google Sheets Icon" className="w-6 h-6" />
                    </button>
                  </div>
                  <h3 className="mt-4 font-semibold">Liste des dépenses</h3>
                  <ul>
                    {expenses.map((item, index) => (
                      <li key={index} className="flex justify-between py-2">
                        <span>{item.description}</span>
                        <span>{item.date}</span>
                        <span className="text-red-500">{item.amount} €</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="container mx-auto mt-8">
                <BudgetSummary totalIncome={totalIncome} totalExpenses={totalExpenses} />
              </div>
            </main>
          }
        />
        <Route
          path="/expenses-chart"
          element={<ExpensesChartPage expenses={expenses} isDarkTheme={isDarkTheme} />}
        />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/savings" element={<Savings balance={balance} />} />
        <Route
          path="/subscriptions"
          element={
            <MySubscriptionsPage
              subscriptions={expenses
                .filter((e) => e.description.includes("Subscription"))
                .map((e) => ({ ...e, frequency: "monthly" } as ExtendedExpenseItem))}
              onCancelSubscription={onCancelSubscription}
            />
          }
        />
        <Route path="/income" element={<MyIncomePage income={income} />} />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              balance={balance}
              recentTransactions={recentTransactions}
            />
          }
        />
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