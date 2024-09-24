import React, { useState } from 'react';
import { format } from 'date-fns';

interface Transaction {
  type: string;
  amount: string;
  date: string;
}

interface SavingsProps {
  balance: number;
}

const Savings: React.FC<SavingsProps> = ({ balance: initialBalance }) => {
  const [balance, setBalance] = useState<number>(initialBalance);
  const [amount, setAmount] = useState<string>('');
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
  const [currency, setCurrency] = useState<string>('USD');

  const addTransaction = (type: string) => {
    const newBalance =
      type === 'Add'
        ? balance + parseFloat(amount)
        : balance - parseFloat(amount);

    setBalance(newBalance);

    const newTransaction: Transaction = {
      type,
      amount: parseFloat(amount).toFixed(2),
      date: format(new Date(), 'MM/dd/yyyy'),
    };

    setTransactionHistory([...transactionHistory, newTransaction]);
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-5">Savings</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-3/4 lg:w-1/2">
        <p className="text-xl mb-3">Balance: {currency} {balance.toFixed(2)}</p>
        <div className="mb-3">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="p-2 border border-gray-300 rounded-md mr-3 w-40"
          />
          <button
            onClick={() => addTransaction('Add')}
            className="p-2 bg-green-500 text-white rounded-md mr-3"
          >
            Add
          </button>
          <button
            onClick={() => addTransaction('Withdraw')}
            className="p-2 bg-red-500 text-white rounded-md"
          >
            Withdraw
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="currency" className="mr-3">Currency:</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            {/* Add more currencies as needed */}
          </select>
        </div>
        <h2 className="text-xl mb-3">Transaction History</h2>
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Type</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactionHistory.length > 0 ? (
              transactionHistory.map((transaction, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{transaction.type}</td>
                  <td className="p-2">{currency} {transaction.amount}</td>
                  <td className="p-2">{transaction.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-2 text-center">
                  No transactions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <a href="/" className="text-blue-500 mt-3 block">
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default Savings;