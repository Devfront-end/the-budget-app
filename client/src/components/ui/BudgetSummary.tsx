// components/BudgetSummary.tsx
import React from 'react';

interface BudgetSummaryProps {
  totalIncome: number;
  totalExpenses: number;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ totalIncome, totalExpenses }) => {
  const balance = totalIncome - totalExpenses;

  return (
    <div className="bg-green-100 p-6 rounded-lg shadow-md flex justify-between items-center">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Total Income</h2>
        <p className="text-green-600 text-2xl font-bold">
          {totalIncome.toFixed(2)} €
        </p>
      </div>
      <div className="text-center">
        <h2 className="text-lg font-semibold">Total Expenses</h2>
        <p className="text-red-600 text-2xl font-bold">
          {totalExpenses.toFixed(2)} €
        </p>
      </div>
      <div className="text-center">
        <h2 className="text-lg font-semibold">Balance</h2>
        <p
          className={`text-2xl font-bold ${
            balance >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {balance.toFixed(2)} €
        </p>
      </div>
    </div>
  );
};

export default BudgetSummary;