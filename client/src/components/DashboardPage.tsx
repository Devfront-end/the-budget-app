import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg shadow bg-gray-200">
          <h2 className="text-xl font-semibold mb-2">Total Income</h2>
          <p className="text-lg">$0.00</p>
        </div>
        <div className="p-4 rounded-lg shadow bg-gray-200">
          <h2 className="text-xl font-semibold mb-2">Total Expenses</h2>
          <p className="text-lg">$0.00</p>
        </div>
        <div className="p-4 rounded-lg shadow bg-gray-200">
          <h2 className="text-xl font-semibold mb-2">Total Savings</h2>
          <p className="text-lg">$0.00</p>
        </div>
        <div className="p-4 rounded-lg shadow bg-gray-200">
          <h2 className="text-xl font-semibold mb-2">Total Subscriptions</h2>
          <p className="text-lg">$0.00</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;