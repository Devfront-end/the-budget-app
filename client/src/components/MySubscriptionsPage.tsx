import React, { useState } from "react";

interface Subscription {
  name: string;
  logo: string;
  monthlyPayment: number;
  yearlyPayment: number;
}

const MySubscriptionsPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [newSubscription, setNewSubscription] = useState<Subscription>({
    name: "",
    logo: "",
    monthlyPayment: 0,
    yearlyPayment: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSubscription({ ...newSubscription, [name]: value });
  };

  const handleAddSubscription = () => {
    setSubscriptions([...subscriptions, newSubscription]);
    setNewSubscription({
      name: "",
      logo: "",
      monthlyPayment: 0,
      yearlyPayment: 0,
    });
  };

  return (
    <div>
      <h1>My Subscriptions Page</h1>
      <div>
        <input
          type="text"
          name="name"
          value={newSubscription.name}
          onChange={handleInputChange}
          placeholder="Subscription Name"
        />
        <input
          type="text"
          name="logo"
          value={newSubscription.logo}
          onChange={handleInputChange}
          placeholder="Logo URL"
        />
        <input
          type="number"
          name="monthlyPayment"
          value={newSubscription.monthlyPayment}
          onChange={handleInputChange}
          placeholder="Monthly Payment"
        />
        <input
          type="number"
          name="yearlyPayment"
          value={newSubscription.yearlyPayment}
          onChange={handleInputChange}
          placeholder="Yearly Payment"
        />
        <button onClick={handleAddSubscription}>Add Subscription</button>
      </div>
      <ul>
        {subscriptions.map((subscription, index) => (
          <li key={index}>
            <img src={subscription.logo} alt={subscription.name} width="50" />
            <div>{subscription.name}</div>
            <div>Monthly: {subscription.monthlyPayment}</div>
            <div>Yearly: {subscription.yearlyPayment}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MySubscriptionsPage;