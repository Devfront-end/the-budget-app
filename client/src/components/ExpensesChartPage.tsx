import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

interface ExpenseItem {
  description: string;
  amount: number;
  date: string;
}

interface ExpensesChartPageProps {
  expenses?: ExpenseItem[];
  isDarkTheme: boolean;
}

const ExpensesChartPage: React.FC<ExpensesChartPageProps> = ({ expenses = [], isDarkTheme }) => {
  const chartData = expenses.reduce((acc, expense) => {
    const existingCategory = acc.find(item => item.name === expense.description);
    if (existingCategory) {
      existingCategory.value += expense.amount;
    } else {
      acc.push({ name: expense.description, value: expense.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  if (expenses.length === 0) {
    return (
      <div className={`min-h-screen p-4 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
        <h2 className="text-2xl font-bold mb-4">Répartition des dépenses</h2>
        <p>Aucune dépense à afficher.</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <h2 className="text-2xl font-bold mb-4">Répartition des dépenses</h2>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4">
          <table className={`w-full border-collapse ${isDarkTheme ? 'text-white' : 'text-black'}`}>
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="border px-4 py-2">{expense.description}</td>
                  <td className="border px-4 py-2">{expense.amount.toFixed(2)} €</td>
                  <td className="border px-4 py-2">{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpensesChartPage;