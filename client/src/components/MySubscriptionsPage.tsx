import React, { useState } from "react";
import { ExpenseItem } from "../types";
import { CSVLink } from "react-csv";
import { ChevronRight } from "lucide-react";

interface ExtendedExpenseItem extends ExpenseItem {
  frequency?: string;
}

interface MySubscriptionsPageProps {
  subscriptions: ExtendedExpenseItem[];
  onCancelSubscription: (id: string) => void;
}

const MySubscriptionsPage: React.FC<MySubscriptionsPageProps> = ({ subscriptions, onCancelSubscription }) => {
  const [filterDate, setFilterDate] = useState<string>("");
  const [newSubscription, setNewSubscription] = useState<{
    description: string;
    amount: string;
    date: string;
    type: string;
    frequency: string;
  }>({ description: "", amount: "", date: "", type: "", frequency: "monthly" });
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});

  const handleAddSubscription = () => {
    if (newSubscription.description && newSubscription.amount && newSubscription.date && newSubscription.type) {
      const newSubscriptionItem: ExtendedExpenseItem = {
        id: '_' + Math.random().toString(36).substr(2, 9), // Generate unique id
        description: newSubscription.description,
        amount: Number(newSubscription.amount),
        date: newSubscription.date,
        type: newSubscription.type,
        frequency: newSubscription.frequency,
      };
      subscriptions.push(newSubscriptionItem); // Add new subscription to the list
      clearForm();
    }
  };

  const clearForm = () => {
    setNewSubscription({
      description: "",
      amount: "",
      date: "",
      type: "",
      frequency: "monthly"
    });
  };

  const generateGoogleCalendarLink = (subscription: ExtendedExpenseItem) => {
    const eventTitle = `${subscription.description} Payment`;
    const eventDetails = `Amount: €${subscription.amount}\nPayment Method: ${subscription.type}`;
    const startDate = new Date(subscription.date);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour event

    let recurrence;
    if (subscription.frequency === 'monthly') {
      recurrence = 'RRULE:FREQ=MONTHLY';
    } else {
      recurrence = 'RRULE:FREQ=YEARLY';
    }

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&details=${encodeURIComponent(eventDetails)}&dates=${startDate.toISOString().replace(/-|:|\.\d\d\d/g, "")}/${endDate.toISOString().replace(/-|:|\.\d\d\d/g, "")}&recur=${encodeURIComponent(recurrence)}`;
  };

  const handleFlipCard = (id: string) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCancelSubscription = (id: string) => {
    onCancelSubscription(id);
    setFlippedCards(prev => ({ ...prev, [id]: false }));
  };

  const filteredSubscriptions = filterDate
    ? subscriptions.filter((subscription) => subscription.date === filterDate)
    : subscriptions;

  const csvData = filteredSubscriptions.map(subscription => ({
    Description: subscription.description,
    Amount: subscription.amount,
    Date: subscription.date,
    Type: subscription.type,
    Frequency: subscription.frequency,
  }));

  const totalAmount = filteredSubscriptions.reduce((total, subscription) => total + subscription.amount, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">My Subscriptions</h1>
        <p className="text-gray-700 mb-6">Easily manage your recurring subscriptions below:</p>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <label className="block text-gray-800 font-semibold mb-2">Filter by Date:</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500 transition duration-200"
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Subscription</h3>
          <div className="grid gap-4 mb-4">
            <input
              type="text"
              value={newSubscription.description}
              onChange={(e) => setNewSubscription({ ...newSubscription, description: e.target.value })}
              placeholder="Subscription Description"
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500 transition duration-200"
            />
            <input
              type="number"
              value={newSubscription.amount}
              onChange={(e) => setNewSubscription({ ...newSubscription, amount: e.target.value })}
              placeholder="Amount (€)"
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500 transition duration-200"
            />
            <input
              type="date"
              value={newSubscription.date}
              onChange={(e) => setNewSubscription({ ...newSubscription, date: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500 transition duration-200"
            />
            <select
              value={newSubscription.type}
              onChange={(e) => setNewSubscription({ ...newSubscription, type: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500 transition duration-200"
            >
              <option value="" disabled>Select Payment Type</option>
              <option value="Google Pay">Google Pay</option>
              <option value="PayPal">PayPal</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
            <select
              value={newSubscription.frequency}
              onChange={(e) => setNewSubscription({ ...newSubscription, frequency: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500 transition duration-200"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleAddSubscription}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
            >
              Add Subscription
            </button>
            <button
              onClick={clearForm}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition duration-200 shadow-md hover:shadow-lg"
            >
              Cancel
            </button>
          </div>
        </div>

        <ul className="mb-6">
          {filteredSubscriptions.length > 0 ? (
            filteredSubscriptions.map((subscription) => (
              <li key={subscription.id} className="mb-4">
                <div className={`relative ${flippedCards[subscription.id] ? 'h-32' : 'h-24'} transition-all duration-500`}>
                  <div className={`absolute w-full h-full bg-white rounded-lg shadow-md transition-all duration-500 ${flippedCards[subscription.id] ? 'rotate-y-180 opacity-0' : 'rotate-y-0 opacity-100'}`}>
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <p className="text-lg font-medium text-gray-900">{subscription.description}</p>
                        <p className="text-gray-500">{subscription.amount} € on {subscription.date} via {subscription.type} ({subscription.frequency})</p>
                        <div className="mt-2">
                          <button
                            onClick={() => window.open(generateGoogleCalendarLink(subscription), '_blank')}
                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition duration-200"
                          >
                            <span className="mr-2">Add to Google Calendar</span>
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => handleFlipCard(subscription.id)}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  </div>
                  <div className={`absolute w-full h-full bg-red-100 rounded-lg shadow-md p-4 flex flex-col justify-center items-center transition-all duration-500 ${flippedCards[subscription.id] ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0'}`}>
                    <p className="text-lg font-medium text-red-600 mb-2">Cancel Subscription?</p>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleCancelSubscription(subscription.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleFlipCard(subscription.id)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-center py-4">No subscriptions found for the selected date.</li>
          )}
        </ul>

        <div className="text-right mb-6">
          <p className="text-lg font-semibold text-gray-800">Total: {totalAmount} €</p>
        </div>

        <div className="text-right">
          <CSVLink
            data={csvData}
            filename={`subscriptions-${filterDate || 'all'}.csv`}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-md hover:shadow-lg"
          >
            Download CSV
          </CSVLink>
        </div>
      </div>
    </div>
  );
};

export default MySubscriptionsPage;