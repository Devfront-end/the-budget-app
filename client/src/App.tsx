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
            <Bar dataKey="value" fill="#8884d8" />
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
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        );
      default:
        return null;
    }
  };

  const themeClasses = isDarkTheme
    ? {
        body: "bg-gray-900 text-white",
        header: "bg-indigo-800",
        card: "bg-gray-800",
        input: "bg-gray-700 text-white border-gray-600",
        button: "bg-indigo-600 hover:bg-indigo-700",
        incomeText: "text-green-400",
        expenseText: "text-red-400",
        balanceCard: "bg-gray-700",
      }
    : {
        body: "bg-gray-100 text-gray-900",
        header: "bg-indigo-600",
        card: "bg-white",
        input: "bg-white text-gray-900 border-gray-300",
        button: "bg-indigo-600 hover:bg-indigo-700",
        incomeText: "text-green-600",
        expenseText: "text-red-600",
        balanceCard: "bg-green-100",
      };

  return (
    <div className={`${themeClasses.body} min-h-screen`}>
      <header className={`${themeClasses.header} text-white p-4 flex justify-between items-center`}>
        <h1 className="text-2xl font-bold">Budget App</h1>
        {isDarkTheme ? (
          <Sun className="cursor-pointer" onClick={toggleTheme} />
        ) : (
          <Moon className="cursor-pointer" onClick={toggleTheme} />
        )}
      </header>

      <main className="container mx-auto p-4">
        <div className={`${themeClasses.balanceCard} p-4 rounded-lg shadow mb-4`}>
          <h2 className="text-xl font-semibold">Budget Summary</h2>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div>
              <div className="text-sm opacity-75">Total Income</div>
              <div className={`text-lg font-bold ${themeClasses.incomeText}`}>{totalIncome.toFixed(2)} €</div>
            </div>
            <div>
              <div className="text-sm opacity-75">Total Expenses</div>
              <div className={`text-lg font-bold ${themeClasses.expenseText}`}>{totalExpenses.toFixed(2)} €</div>
            </div>
            <div>
              <div className="text-sm opacity-75">Balance</div>
              <div className={`text-lg font-bold ${remainingMoney >= 0 ? themeClasses.incomeText : themeClasses.expenseText}`}>
                {remainingMoney.toFixed(2)} €
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className={`${themeClasses.card} p-4 rounded-lg shadow`}>
            <h2 className="text-xl font-semibold mb-4">Entrées d'argent</h2>
            <div className="flex flex-wrap mb-2">
              <select 
                className={`${themeClasses.input} flex-grow mr-2 p-2 rounded mb-2 sm:mb-0`}
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
                className={`${themeClasses.input} w-full sm:w-24 mr-2 p-2 rounded mb-2 sm:mb-0`}
                value={newIncome.amount}
                onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
              />
              <button
                className={`${themeClasses.button} w-full sm:w-auto text-white px-4 py-2 rounded`}
                onClick={handleAddIncome}
              >
                + Ajouter
              </button>
            </div>
            <div className="flex mb-2">
              <input
                type="text"
                placeholder="Nouvelle catégorie"
                className={`${themeClasses.input} flex-grow mr-2 p-2 rounded`}
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
                <span>{item.description}: <span className={themeClasses.incomeText}>{item.amount} €</span></span>
                <Trash2
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteIncome(index)}
                />
              </div>
            ))}
            <div className="mt-4 font-semibold">
              Total des entrées: <span className={themeClasses.incomeText}>{totalIncome.toFixed(2)} €</span>
            </div>
          </div>

          <div className={`${themeClasses.card} p-4 rounded-lg shadow`}>
            <h2 className="text-xl font-semibold mb-4">Ajouter une dépense</h2>
            <div className="flex flex-wrap mb-2">
              <select
                className={`${themeClasses.input} flex-grow mr-2 p-2 rounded mb-2 sm:mb-0`}
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
                className={`${themeClasses.input} w-full sm:w-24 mr-2 p-2 rounded mb-2 sm:mb-0`}
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              />
              <input
                type="date"
                className={`${themeClasses.input} w-full sm:w-32 mr-2 p-2 rounded mb-2 sm:mb-0`}
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              />
              <button
                className={`${themeClasses.button} w-full sm:w-auto text-white px-4 py-2 rounded`}
                onClick={handleAddExpense}
              >
                + Ajouter
              </button>
            </div>
            <div className="flex mb-2">
              <input
                type="text"
                placeholder="Nouvelle catégorie"
                className={`${themeClasses.input} flex-grow mr-2 p-2 rounded`}
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

        <div className={`${themeClasses.card} p-4 rounded-lg shadow mb-4`}>
          <h2 className="text-xl font-semibold mb-4">Sorties d'argent</h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des dépenses..."
              className={`${themeClasses.input} w-full p-2 pl-10 border rounded`}
            />
          </div>
          {expenses.map((expense, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <div>
                <div className="font-semibold">{expense.description}</div>
                <div className="text-sm opacity-75">{expense.date}</div>
              </div>
              <div className="flex items-center">
                <span className={`mr-2 ${themeClasses.expenseText}`}>{expense.amount} €</span>
                <Trash2
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteExpense(index)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={`${themeClasses.card} p-4 rounded-lg shadow`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Répartition des dépenses</h2>
            <Download className="text-green-500 cursor-pointer" />
          </div>
          <select 
            className={`${themeClasses.input} w-full p-2 mb-4 border rounded`}
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