import React, { useState } from 'react';
import { Trash } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface WishlistItem {
  description: string;
  purchased: boolean;
  price: number;
  picture: string;
  link: string;
}

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const [newPrice, setNewPrice] = useState<string>('');
  const [newPicture, setNewPicture] = useState<string>('');
  const [newLink, setNewLink] = useState<string>('');

  const handleAddItem = () => {
    if (newItem && newPrice) {
      setWishlist([...wishlist, { description: newItem, purchased: false, price: parseFloat(newPrice), picture: newPicture, link: newLink }]);
      setNewItem('');
      setNewPrice('');
      setNewPicture('');
      setNewLink('');
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

  const calculateTotalPrice = () => {
    return wishlist.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Wishlist', 10, 10);
    wishlist.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.description} - $${item.price}`, 10, 20 + index * 10);
    });
    doc.save('wishlist.pdf');
  };

  const downloadImage = () => {
    html2canvas(document.querySelector("#wishlist")!).then(canvas => {
      const link = document.createElement('a');
      link.download = 'wishlist.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>
      <div className="flex flex-wrap mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Nouvel article"
          className="p-2 border rounded mr-2 mb-2 w-full sm:w-auto"
        />
        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          placeholder="Prix"
          className="p-2 border rounded mr-2 mb-2 w-full sm:w-auto"
        />
        <input
          type="text"
          value={newPicture}
          onChange={(e) => setNewPicture(e.target.value)}
          placeholder="URL de l'image"
          className="p-2 border rounded mr-2 mb-2 w-full sm:w-auto"
        />
        <input
          type="text"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
          placeholder="Lien"
          className="p-2 border rounded mr-2 mb-2 w-full sm:w-auto"
        />
        <button onClick={handleAddItem} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto mr-2 mb-2">
          + Ajouter
        </button>
        <button onClick={downloadPDF} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2 mb-2 w-full sm:w-auto">
          Télécharger PDF
        </button>
        <button onClick={downloadImage} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2 w-full sm:w-auto">
          Télécharger Image
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Description</th>
              <th className="py-2 px-4 border-b border-gray-300">Prix</th>
              <th className="py-2 px-4 border-b border-gray-300">Image</th>
              <th className="py-2 px-4 border-b border-gray-300">Lien</th>
              <th className="py-2 px-4 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((item, index) => (
              <tr key={index} className={`${item.purchased ? 'line-through text-gray-500' : ''}`}>
                <td className="py-2 px-4 border-b border-gray-300">{item.description}</td>
                <td className="py-2 px-4 border-b border-gray-300">${item.price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {item.picture && <img src={item.picture} alt={item.description} className="w-10 h-10" />}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Lien</a>}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <input
                    type="checkbox"
                    checked={item.purchased}
                    onChange={() => handleTogglePurchased(index)}
                    className="mr-2"
                  />
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Total: ${calculateTotalPrice()}</h3>
      </div>
    </div>
  );
};

export default WishlistPage;