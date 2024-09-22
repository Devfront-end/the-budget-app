// src/components/WishlistPage.tsx
import React, { useState } from 'react';
import { Trash } from 'lucide-react';

interface WishlistItem {
  description: string;
  purchased: boolean;
}

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [newItem, setNewItem] = useState<string>('');

  const handleAddItem = () => {
    if (newItem) {
      setWishlist([...wishlist, { description: newItem, purchased: false }]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedWishlist = wishlist.filter((_, i) => i !== index);
    setWishlist(updatedWishlist);
  };

  const handleTogglePurchased = (index: number) => {
    const updatedWishlist = wishlist.map((item, i) =>
      i === index ? { ...item, purchased: !item.purchased } : item
    );
    setWishlist(updatedWishlist);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Nouvel article"
          className="p-2 border rounded mr-2"
        />
        <button onClick={handleAddItem} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Ajouter
        </button>
      </div>
      <ul>
        {wishlist.map((item, index) => (
          <li
            key={index}
            className={`flex justify-between items-center border-b py-2 ${item.purchased ? 'line-through text-gray-500' : ''}`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={item.purchased}
                onChange={() => handleTogglePurchased(index)}
                className="mr-2"
              />
              <span>{item.description}</span>
            </div>
            <button
              onClick={() => handleRemoveItem(index)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              <Trash className="w-6 h-6" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistPage;