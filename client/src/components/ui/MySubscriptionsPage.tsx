import React, { useState, useEffect } from "react";
import { PlusCircle, Calendar, Trash2, CreditCard, Edit2 } from "lucide-react";

interface Subscription {
  id: string;
  name: string;
  logo: string;
  amount: number;
  frequency: "monthly" | "yearly" | "quarterly";
  paymentMode: "credit card" | "debit card" | "bank transfer";
  nextPaymentDate: string;
  category?: string;
  description?: string;
}

const PAYMENT_FREQUENCIES = [
  { value: "weekly", label: "weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
];

const PAYMENT_MODES = [
  { value: "credit card", label: "Credit Card" },
  { value: "debit card", label: "Debit Card" },
  { value: "bank transfer", label: "Bank Transfer" },
];

const SUBSCRIPTION_CATEGORIES = [
  "Entertainment",
  "Streaming",
  "Software",
  "Gaming",
  "Music",
  "Fitness",
  "News",
  "Other"
];

const MySubscriptionsPage: React.FC = () => {
  const initialSubscription: Subscription = {
    id: "",
    name: "",
    logo: "",
    amount: 0,
    frequency: "monthly",
    paymentMode: "credit card",
    nextPaymentDate: new Date().toISOString().split("T")[0],
    category: "Entertainment",
    description: ""
  };

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [newSubscription, setNewSubscription] = useState<Subscription>(initialSubscription);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Load subscriptions from localStorage on component mount
  useEffect(() => {
    const savedSubscriptions = localStorage.getItem("subscriptions");
    if (savedSubscriptions) {
      setSubscriptions(JSON.parse(savedSubscriptions));
    }
  }, []);

  // Save subscriptions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
  }, [subscriptions]);

  const calculateTotalMonthly = () => {
    return subscriptions.reduce((total, sub) => {
      const monthlyAmount = sub.frequency === "monthly"
        ? sub.amount
        : sub.frequency === "quarterly"
        ? sub.amount / 3
        : sub.amount / 12;
      return total + monthlyAmount;
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === "amount" ? parseFloat(value) || 0 : value;
    setNewSubscription({ ...newSubscription, [name]: updatedValue });
  };

  const handleAddSubscription = () => {
    if (editingId) {
      setSubscriptions(subscriptions.map(sub =>
        sub.id === editingId ? { ...newSubscription, id: editingId } : sub
      ));
      setEditingId(null);
    } else {
      const subscription = {
        ...newSubscription,
        id: Date.now().toString(),
      };
      setSubscriptions([...subscriptions, subscription]);
    }
    setNewSubscription(initialSubscription);
  };

  const handleEditSubscription = (subscription: Subscription) => {
    setNewSubscription(subscription);
    setEditingId(subscription.id);
  };

  const handleDeleteSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
  };

  const addToCalendar = (subscription: Subscription) => {
    const startDate = new Date(subscription.nextPaymentDate);
    const title = `Payment due for ${subscription.name}`;
    const details = `Amount: $${subscription.amount}\nPayment mode: ${subscription.paymentMode}`;

    const encodedTitle = encodeURIComponent(title);
    const encodedDetails = encodeURIComponent(details);
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&details=${encodedDetails}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;

    window.open(calendarUrl, '_blank');
  };

  const filteredSubscriptions = subscriptions
    .filter(sub =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(sub => selectedCategory === "all" || sub.category === selectedCategory);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50">
      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search subscriptions..."
          className="flex-1 p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">All Categories</option>
          {SUBSCRIPTION_CATEGORIES.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Add/Edit Subscription Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {editingId ? "Edit Subscription" : "Add New Subscription"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newSubscription.name}
              onChange={handleInputChange}
              placeholder="Netflix, Spotify, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
            <input
              type="text"
              name="logo"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newSubscription.logo}
              onChange={handleInputChange}
              placeholder="https://example.com/logo.png"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              name="amount"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newSubscription.amount}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newSubscription.category}
              onChange={handleInputChange}
            >
              {SUBSCRIPTION_CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
            <select
              name="frequency"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newSubscription.frequency}
              onChange={handleInputChange}
            >
              {PAYMENT_FREQUENCIES.map((freq) => (
                <option key={freq.value} value={freq.value}>
                  {freq.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Mode</label>
            <select
              name="paymentMode"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newSubscription.paymentMode}
              onChange={handleInputChange}
            >
              {PAYMENT_MODES.map((mode) => (
                <option key={mode.value} value={mode.value}>
                  {mode.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Next Payment Date</label>
            <input
              type="date"
              name="nextPaymentDate"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newSubscription.nextPaymentDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newSubscription.description}
              onChange={handleInputChange}
              rows={3}
              placeholder="Add any notes or description about this subscription"
            />
          </div>
        </div>
        <button
          onClick={handleAddSubscription}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!newSubscription.name || !newSubscription.amount}
        >
          <PlusCircle className="w-5 h-5" />
          {editingId ? "Update Subscription" : "Add Subscription"}
        </button>
      </div>

      {/* Subscriptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubscriptions.map((subscription) => (
          <div key={subscription.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {subscription.logo && (
                  <img
                    src={subscription.logo}
                    alt={subscription.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{subscription.name}</h3>
                  <span className="text-sm text-gray-500">{subscription.category}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditSubscription(subscription)}
                  className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteSubscription(subscription.id)}
                  className="text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">${subscription.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Frequency:</span>
                <span className="capitalize">{subscription.frequency}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment:</span>
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span className="capitalize">{subscription.paymentMode}</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Next due:</span>
                <span>{new Date(subscription.nextPaymentDate).toLocaleDateString()}</span>
              </div>
              {subscription.description && (
                <div className="text-sm text-gray-600 mt-2">
                  <p>{subscription.description}</p>
                </div>
              )}
              <button
                onClick={() => addToCalendar(subscription)}
                className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Add to Calendar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      {subscriptions.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Summary</h2>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Monthly Cost:</span>
            <span className="text-2xl font-bold text-blue-600">
              ${calculateTotalMonthly().toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySubscriptionsPage;