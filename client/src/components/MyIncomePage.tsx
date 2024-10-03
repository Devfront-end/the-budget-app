import React from "react";
import { ExpenseItem } from "../types";

interface MyIncomePageProps {
  income: ExpenseItem[];
}

const MyIncomePage: React.FC<MyIncomePageProps> = ({ income }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">My Income</h1>
      <p className="mt-4">Here's a breakdown of your income sources:</p>
      <ul className="mt-4">
        {income.map((incomeItem, index) => (
          <li key={index} className="border-b py-2">
            {incomeItem.description}: {incomeItem.amount} € on {incomeItem.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyIncomePage;
