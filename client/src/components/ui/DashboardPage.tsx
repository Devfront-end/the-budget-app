import React from "react";
import { ExpenseItem } from "../../types"; // Import your types if needed

interface DashboardPageProps {
  income: ExpenseItem[];
  expenses: ExpenseItem[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ income, expenses }) => {
  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Income</h2>
          <p className="text-2xl font-bold text-green-600">{totalIncome} €</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Expenses</h2>
          <p className="text-2xl font-bold text-red-600">{totalExpenses} €</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow col-span-2">
          <h2 className="text-xl font-semibold mb-2">Balance</h2>
          <p
            className={`text-2xl font-bold ${balance >= 0 ? "text-blue-600" : "text-red-600"}`}
          >
            {balance} €
          </p>
        </div>
      </div>

      {/* Display lists of individual income and expense items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Income Entries</h2>
          <ul>
            {income.map((item, index) => (
              <li key={index} className="flex justify-between py-2 border-b">
                <span>{item.description}</span>
                <span>{item.amount} €</span>
                <span>{item.date}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Expense Entries</h2>
          <ul>
            {expenses.map((item, index) => (
              <li key={index} className="flex justify-between py-2 border-b">
                <span>{item.description}</span>
                <span>{item.amount} €</span>
                <span>{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
