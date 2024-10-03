import React from "react";
import { ExpenseItem } from "../types";

interface MySubscriptionsPageProps {
  subscriptions: ExpenseItem[];
}

const MySubscriptionsPage: React.FC<MySubscriptionsPageProps> = ({ subscriptions }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">My Subscriptions</h1>
      <p className="mt-4">Manage your recurring subscriptions:</p>
      <ul className="mt-4">
        {subscriptions.map((subscription, index) => (
          <li key={index} className="border-b py-2">
            {subscription.description}: {subscription.amount} € on {subscription.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MySubscriptionsPage;
