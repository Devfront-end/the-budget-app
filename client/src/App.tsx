import React, { useState } from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { FaUserCircle, FaMoneyBillWave, FaStar, FaRegSmile, FaLaptopCode, FaChartLine, FaHandshake, FaHome, FaShoppingCart, FaBus, FaMusic, FaHeartbeat } from "react-icons/fa";
import ExpensesChartPage from "./components/ui/ExpensesChartPage";
import BudgetSummary from "./components/ui/BudgetSummary";
import WishlistPage from "./components/ui/WishlistPage";
import Savings from "./components/ui/Savings";
import { LoginForm } from "./components/ui/LoginForm";
import SignUpForm from "./components/ui/SignUpForm";
import Modal from "./components/ui/Modal";
import csvIcon from "./assets/img/csv-icon.png";
import googleSheetsIcon from "./assets/img/google-sheets-icon.png";
import MySubscriptionsPage from "./components/ui/MySubscriptionsPage";
import MyIncomePage from "./components/ui/MyIncomePage";
import DashboardPage from "./components/ui/DashboardPage";
import { ExpenseItem } from "./types";

interface AppProps {
  expenses: ExpenseItem[];
  isDarkTheme: boolean;
}

const App: React.FC<AppProps> = ({
  expenses: initialExpenses,
  isDarkTheme: initialIsDarkTheme,
}) => {
  const [incomeCategories] = useState<{ name: string; icon: JSX.Element }[]>([
    { name: "Salaire net", icon: <FaMoneyBillWave /> },
    { name: "Primes", icon: <FaStar /> },
    { name: "Prime d'activité", icon: <FaRegSmile /> },
    { name: "Freelance", icon: <FaLaptopCode /> },
    { name: "Investissements", icon: <FaChartLine /> },
    { name: "ARE", icon: <FaHandshake /> },
  ]);

  const [expenseCategories] = useState<{ name: string; icon: JSX.Element }[]>([
    { name: "Loyer", icon: <FaHome /> },
    { name: "Courses", icon: <FaShoppingCart /> },
    { name: "Transport", icon: <FaBus /> },
    { name: "Loisirs", icon: <FaMusic /> },
    { name: "Santé", icon: <FaHeartbeat /> },
  ]);

  const [income, setIncome] = useState<ExpenseItem[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);
  const [newIncome, setNewIncome] = useState<{ description: string; amount: string; date: string }>({ description: "", amount: "", date: "" });
  const [newExpense, setNewExpense] = useState<{ description: string; amount: string; date: string }>({ description: "", amount: "", date: "" });
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(initialIsDarkTheme);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
  };

  const toggleAuthForm = () => {
    setIsLogin(!isLogin);
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
        type: "income",
      };
      setIncome([...income, newIncomeItem]);
      setNewIncome({ description: "", amount: "", date: "" });
    }
  };

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.date) {
      const newExpenseItem: ExpenseItem = {
        id: `${expenses.length + 1}`,
        description: newExpense.description,
        amount: Number(newExpense.amount),
        date: newExpense.date,
        type: "expense",
      };
      setExpenses([...expenses, newExpenseItem]);
      setNewExpense({ description: "", amount: "", date: "" });
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Budget App</h1>
        <nav>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/expenses-chart" className="mr-4">Expenses</Link>
          <Link to="/wishlist" className="mr-4">Wishlist</Link>
          <Link to="/savings" className="mr-4">Savings</Link>
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
        <Route
          path="/"
          element={
            <main className="container mx-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Income Section */}
                <div
                  className={`p-4 rounded-lg shadow ${
                    isDarkTheme ? "bg-gray-800" : "bg-gray-200"
                  }`}
                >
                  <h2 className="text-xl font-semibold mb-4">Entrées d'argent</h2>
                  <div className="flex flex-col space-y-2">
                    <select
                      value={newIncome.description}
                      onChange={(e) =>
                        setNewIncome({
                          ...newIncome,
                          description: e.target.value,
                        })
                      }
                      className={`p-2 border rounded ${
                        isDarkTheme
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-black"
                      }`}
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {incomeCategories.map((category, index) => (
                        <option key={index} value={category.name}>
                          {category.icon} {category.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={newIncome.amount}
                      onChange={(e) =>
                        setNewIncome({ ...newIncome, amount: e.target.value })
                      }
                      placeholder="Montant"
                      className={`p-2 border rounded ${
                        isDarkTheme
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-black"
                      }`}
                    />
                    <input
                      type="date"
                      value={newIncome.date}
                      onChange={(e) =>
                        setNewIncome({ ...newIncome, date: e.target.value })
                      }
                      className={`p-2 border rounded ${
                        isDarkTheme
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-black"
                      }`}
                    />
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleAddIncome}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        + Ajouter
                      </button>
                      <button className="inline-block">
                        <img src={csvIcon} alt="CSV Icon" className="w-6 h-6" />
                      </button>
                      <button className="inline-block">
                        <img src={googleSheetsIcon} alt="Google Sheets Icon" className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Expense Section */}
                <div
                  className={`p-4 rounded-lg shadow ${
                    isDarkTheme ? "bg-gray-800" : "bg-gray-200"
                  }`}
                >
                  <h2 className="text-xl font-semibold mb-4">Ajouter une dépense</h2>
                  <div className="flex flex-col space-y-2">
                    <select
                      value={newExpense.description}
                      onChange={(e) =>
                        setNewExpense({
                          ...newExpense,
                          description: e.target.value,
                        })
                      }
                      className={`p-2 border rounded ${
                        isDarkTheme
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-black"
                      }`}
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {expenseCategories.map((category, index) => (
                        <option key={index} value={category.name}>
                          {category.icon} {category.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={newExpense.amount}
                      onChange={(e) =>
                        setNewExpense({ ...newExpense, amount: e.target.value })
                      }
                      placeholder="Montant"
                      className={`p-2 border rounded ${
                        isDarkTheme
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-black"
                      }`}
                    />
                    <input
                      type="date"
                      value={newExpense.date}
                      onChange={(e) =>
                        setNewExpense({ ...newExpense, date: e.target.value })
                      }
                      className={`p-2 border rounded ${
                        isDarkTheme
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-black"
                      }`}
                    />
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleAddExpense}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        + Ajouter
                      </button>
                      <button className="inline-block">
                        <img src={csvIcon} alt="CSV Icon" className="w-6 h-6" />
                      </button>
                      <button className="inline-block">
                        <img src={googleSheetsIcon} alt="Google Sheets Icon" className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
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
        <Route path="/subscriptions" element={<MySubscriptionsPage />} />
        <Route path="/income" element={<MyIncomePage />} />
        <Route
          path="/dashboard"
          element={<DashboardPage income={income} expenses={expenses} />}
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