import React, { useState } from 'react';
import { Trash2, Download, Moon, Sun, Search } from 'lucide-react';
import { PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

interface IncomeItem {
  description: string;
  amount: number;
}

interface ExpenseItem {
  description: string;
  amount: number;
  date: string;
}

const BudgetApp: React.FC = () => {
  const [incomeCategories, setIncomeCategories] = useState<string[]>(['Salaire net', 'Primes', "Prime d'activité", 'Freelance', 'Investissements']);
  const [expenseCategories, setExpenseCategories] = useState<string[]>(['Loyer', 'Courses', 'Transport', 'Loisirs', 'Santé']);
  const [income, setIncome] = useState<IncomeItem[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [newIncome, setNewIncome] = useState<{ description: string; amount: string }>({ description: '', amount: '' });
  const [newExpense, setNewExpense] = useState<{ description: string; amount: string; date: string }>({ description: '', amount: '', date: '' });
  const [newCategory, setNewCategory] = useState<string>('');
  const [chartType, setChartType] = useState<string>('pie');
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

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

  const handleDeleteIncome = (index: number) => {
    setIncome(income.filter((_, i) => i !== index));
  };

  const handleDeleteExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
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

  const chartData = expenses.map(expense => ({
    name: expense.description,
    value: expense.amount
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return (
          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              cx={200}
              cy={150}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      case 'bar':
        return (
          <BarChart width={400} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        );
      case 'line':
        return (
          <LineChart width={400} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Line>
          </LineChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Budget App</h1>
        {isDarkTheme ? (
          <Sun className="cursor-pointer" onClick={toggleTheme} />
        ) : (
          <Moon className="cursor-pointer" onClick={toggleTheme} />
        )}
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className={`p-4 rounded-lg shadow ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Entrées d'argent</h2>
            <div className="flex flex-wrap mb-2">
              <select 
                className={`flex-grow mr-2 p-2 border rounded mb-2 sm:mb-0 ${isDarkTheme ? 'border-gray-700' : 'border-gray-300'}`}
                value={newIncome.description}
                onChange={(e) => setNewIncome({ ...newIncome, description: e.target.value })}
              >
                <option value="">Sélectionner une catégorie</option>
                {incomeCategories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Montant"
                className={`w-full sm:w-24 mr-2 p-2 border rounded mb-2 sm:mb-0 ${isDarkTheme ? 'border-gray-700' : 'border-gray-300'}`}
                value={newIncome.amount}
                onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
              />
              <button
                className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded"
                onClick={handleAddIncome}
              >
                + Ajouter
              </button>
            </div>
            <div className="flex mb-2">
              <input
                type="text"
                placeholder="Nouvelle catégorie"
                className={`flex-grow mr-2 p-2 border rounded ${isDarkTheme ? 'border-gray-700' : 'border-gray-300'}`}
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => handleAddCategory('income')}
              >
                + Catégorie
              </button>
            </div>
            {income.map((item, index) => (
              <div key={index} className="flex justify-between items-center mt-2">
                <span>{item.description}: {item.amount} €</span>
                <Trash2
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteIncome(index)}
                />
              </div>
            ))}
            <div className="mt-4 font-semibold">
              Total des entrées: {totalIncome.toFixed(2)} €
            </div>
          </div>

          <div className={`p-4 rounded-lg shadow ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Ajouter une dépense</h2>
            <div className="flex flex-wrap mb-2">
              <select
                className={`flex-grow mr-2 p-2 border rounded mb-2 sm:mb-0 ${isDarkTheme ? 'border-gray-700' : 'border-gray-300'}`}
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              >
                <option value="">Sélectionner une catégorie</option>
                {expenseCategories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Montant"
                className={`w-full sm:w-24 mr-2 p-2 border rounded mb-2 sm:mb-0 ${isDarkTheme ? 'border-gray-700' : 'border-gray-300'}`}
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              />
              <input
                type="date"
                className={`w-full sm:w-32 mr-2 p-2 border rounded mb-2 sm:mb-0 ${isDarkTheme ? 'border-gray-700' : 'border-gray-300'}`}
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              />
              <button
                className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded"
                onClick={handleAddExpense}
              >
                + Ajouter
              </button>
            </div>
            <div className="flex mb-2">
              <input
                type="text"
                placeholder="Nouvelle catégorie"
                className={`flex-grow mr-2 p-2 border rounded ${isDarkTheme ? 'border-gray-700' : 'border-gray-300'}`}
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => handleAddCategory('expense')}
              >
                + Catégorie
              </button>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg shadow mb-4 ${isDarkTheme ? 'bg-gray-800' : 'bg-green-100'}`}>
          <h2 className="text-xl font-semibold">Argent restant: {remainingMoney.toFixed(2)} €</h2>
        </div>

        <div className={`p-4 rounded-lg shadow mb-4 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Budget Summary</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm opacity-75">Total Income</div>
              <div className="text-lg font-bold">{totalIncome.toFixed(2)} €</div>
            </div>
            <div>
              <div className="text-sm opacity-75">Total Expenses</div>
              <div className="text-lg font-bold">{totalExpenses.toFixed(2)} €</div>
            </div>
            <div>
              <div className="text-sm opacity-75">Balance</div>
              <div className="text-lg font-bold">{remainingMoney.toFixed(2)} €</div>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg shadow ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Répartition des dépenses</h2>
            <Download className="text-green-500 cursor-pointer" />
          </div>
          <select 
            className={`w-full p-2 mb-4 border rounded ${isDarkTheme ? 'border-gray-700' : 'border-gray-300'}`}
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="pie">Pie chart</option>
            <option value="bar">Bar chart</option>
            <option value="line">Line chart</option>
          </select>
          <div className="w-full overflow-x-auto">
            {renderChart()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BudgetApp;