import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHome,
  faUtensils,
  faCar,
  faBolt,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

// Define a union type for expense types
type ExpenseType =
  | "groceries"
  | "rent"
  | "dining"
  | "transportation"
  | "utilities"
  | "income"
  | "expense";

// Use the union type as keys for the expenseTypeToIcon object
const expenseTypeToIcon: Record<ExpenseType, any> = {
  groceries: faShoppingCart,
  rent: faHome,
  dining: faUtensils,
  transportation: faCar,
  utilities: faBolt,
  income: faQuestionCircle, // Example icon for income
  expense: faQuestionCircle, // Example icon for expense
  // Add more mappings as needed
};

interface ExpenseItem {
  description: string;
  amount: number;
  date: string;
  type: ExpenseType;
}

interface ExpensesChartPageProps {
  expenses: ExpenseItem[];
  isDarkTheme: boolean;
}

const ExpensesChartPage: React.FC<ExpensesChartPageProps> = ({ expenses, isDarkTheme }) => {
  const [chartType, setChartType] = useState<'pie' | 'doughnut' | 'bar' | 'line' | 'area' | 'radar'>('bar');

  const chartData = expenses.map(expense => ({
    name: expense.description,
    value: expense.amount
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return (
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
        );
      case 'doughnut':
        return (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
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
        );
      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        );
      case 'radar':
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar name="Expenses" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        );
    }
  };

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
      <div className="mb-4">
        <label htmlFor="chartType" className="mr-2">Type de graphique:</label>
        <select
          id="chartType"
          value={chartType}
          onChange={(e) => setChartType(e.target.value as 'pie' | 'doughnut' | 'bar' | 'line' | 'area' | 'radar')}
          className={`p-2 rounded ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        >
          <option value="pie">Graphique circulaire</option>
          <option value="doughnut">Graphique anneau</option>
          <option value="bar">Graphique à barres</option>
          <option value="line">Graphique linéaire</option>
          <option value="area">Graphique de zone</option>
          <option value="radar">Graphique radar</option>
        </select>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <ResponsiveContainer width="100%" height={400}>
            {renderChart()}
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
                  <td className="border px-4 py-2">
                    <FontAwesomeIcon
                      icon={expenseTypeToIcon[expense.type] || faQuestionCircle}
                      className="inline-block w-6 h-6 mr-2"
                    />
                    {expense.description}
                  </td>
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