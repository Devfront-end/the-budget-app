import React from "react";

interface DashboardPageProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ totalIncome, totalExpenses, balance }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">Here's an overview of your financial status:</p>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold">Total Income: {totalIncome} €</h2>
        <h2 className="text-xl font-semibold">Total Expenses: {totalExpenses} €</h2>
        <h2 className="text-xl font-semibold">Balance: {balance} €</h2>
      </div>
      <h3 className="mt-6 text-lg font-semibold">Recent Transactions</h3>
      {/* You can add a list of recent transactions here */}
    </div>
  );
};

export default DashboardPage;
