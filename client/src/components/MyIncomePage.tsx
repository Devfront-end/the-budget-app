import React, { useState } from "react";

interface Income {
  source: string;
  amount: number;
  frequency: "monthly" | "yearly";
}

const MyIncomePage: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [newIncome, setNewIncome] = useState<Income>({
    source: "",
    amount: 0,
    frequency: "monthly",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewIncome({ ...newIncome, [name]: value });
  };

  const handleAddIncome = () => {
    setIncomes([...incomes, newIncome]);
    setNewIncome({
      source: "",
      amount: 0,
      frequency: "monthly",
    });
  };

  return (
    <div>
      <h1>My Income</h1>
      <div>
        <input
          type="text"
          name="source"
          placeholder="Income Source"
          value={newIncome.source}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newIncome.amount}
          onChange={handleInputChange}
        />
        <select
          name="frequency"
          value={newIncome.frequency}
          onChange={handleInputChange}
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <button onClick={handleAddIncome}>Add Income</button>
      </div>
      <ul>
        {incomes.map((income, index) => (
          <li key={index}>
            <p>Source: {income.source}</p>
            <p>Amount: ${income.amount}</p>
            <p>Frequency: {income.frequency}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyIncomePage;