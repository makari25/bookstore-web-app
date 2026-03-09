import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function BookCard({ book }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col">
      <div className="relative h-56 w-full overflow-hidden">
        <img src={book.image} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-gray-800 truncate">{book.title}</h3>
        <p className="text-sm text-gray-500 mb-4">{book.author}</p>
        
        <div className="mt-auto flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-600">${book.price}</span>
          <button 
            onClick={handleAdd} 
            disabled={added}
            className={`px-4 py-2 font-semibold text-sm rounded-lg transition-all duration-300 ${added ? 'bg-green-500 text-white' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white'}`}
          >
            {added ? "✓ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}