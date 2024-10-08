import React, { useState } from 'react';
import { Trash2, Search, Download, Moon } from 'lucide-react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

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
  const [incomeCategories, setIncomeCategories] = useState<string[]>(['Salaire net', 'Freelance', 'Investissements']);
  const [expenseCategories, setExpenseCategories] = useState<string[]>(['Loyer', 'Courses', 'Transport', 'Loisirs', 'Santé']);
  const [income, setIncome] = useState<IncomeItem[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [newIncome, setNewIncome] = useState<{ description: string; amount: string }>({ description: '', amount: '' });
  const [newExpense, setNewExpense] = useState<{ description: string; amount: string; date: string }>({ description: '', amount: '', date: '' });
  const [newCategory, setNewCategory] = useState<string>('');

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

  const pieChartData = expenses.map(expense => ({
    name: expense.description,
    value: expense.amount
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Budget App</h1>
        <Moon className="cursor-pointer" />
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Entrées d'argent</h2>
            <div className="flex mb-2">
              <select 
                className="flex-grow mr-2 p-2 border rounded"
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
                className="w-24 mr-2 p-2 border rounded"
                value={newIncome.amount}
                onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
              />
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded"
                onClick={handleAddIncome}
              >
                + Ajouter
              </button>
            </div>
            <div className="flex mb-2">
              <input
                type="text"
                placeholder="Nouvelle catégorie"
                className="flex-grow mr-2 p-2 border rounded"
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

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Ajouter une dépense</h2>
            <div className="flex mb-2">
              <select
                className="flex-grow mr-2 p-2 border rounded"
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
                className="w-24 mr-2 p-2 border rounded"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              />
              <input
                type="date"
                className="w-32 mr-2 p-2 border rounded"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              />
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded"
                onClick={handleAddExpense}
              >
                + Ajouter
              </button>
            </div>
            <div className="flex mb-2">
              <input
                type="text"
                placeholder="Nouvelle catégorie"
                className="flex-grow mr-2 p-2 border rounded"
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

        <div className="bg-green-100 p-4 rounded-lg shadow mb-4">
          <h2 className="text-xl font-semibold">Argent restant: {remainingMoney.toFixed(2)} €</h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h2 className="text-xl font-semibold mb-4">Sorties d'argent</h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des dépenses..."
              className="w-full p-2 pl-10 border rounded"
            />
          </div>
          {expenses.map((expense, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <div>
                <div className="font-semibold">{expense.description}</div>
                <div className="text-sm text-gray-500">{expense.date}</div>
              </div>
              <div className="flex items-center">
                <span className="mr-2">{expense.amount} €</span>
                <Trash2
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteExpense(index)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Répartition des dépenses</h2>
            <Download className="text-green-500 cursor-pointer" />
          </div>
          <select className="w-full p-2 mb-4 border rounded">
            <option>Pie chart</option>
          </select>
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx={200}
              cy={200}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </main>
    </div>
  );
};

export default BudgetApp;