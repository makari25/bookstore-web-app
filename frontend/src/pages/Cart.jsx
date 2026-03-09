import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Cart = ({ orderId }) => {
  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    cartTotal,
    clearCart,
    cartCount,
  } = useCart();

  const navigate = useNavigate(); // Initialize navigate hook

  // State for payment
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handlers
  const validatePhoneNumber = (number) => {
    const cleanNumber = number.trim();
    return /^(?:254|0)[17]\d{8}$/.test(cleanNumber);
  };

  const handleBuy = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number (e.g., 254712345678).');
      return;
    }

    setError('');
    setLoading(true);
    setSuccessMessage('');

    try {
      const payload = {
        phoneNumber: phoneNumber.startsWith('0') ? `254${phoneNumber.slice(1)}` : phoneNumber,
        amount: cartTotal,
        orderId,
      };

      // Simulate API call or replace with your real endpoint
      const response = await axios.post('/api/payments/mpesa', payload);
      
      console.log('Payment response:', response.data);
      setSuccessMessage('Payment initiated! Please check your phone.');
      
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- EMPTY STATE ---
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <div className="mb-6">
          <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  // --- CART WITH ITEMS ---
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({cartCount} items)</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        {/* Left Column: Items List */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <li key={item.title} className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover"/>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.author}</p>
                      <p className="text-indigo-600 font-semibold mt-1">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button 
                        onClick={() => decrementQuantity(item.title)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-l-lg"
                      >
                        -
                      </button>
                      <span className="px-4 font-bold text-gray-800">{item.quantity}</span>
                      <button 
                        onClick={() => incrementQuantity(item.title)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-r-lg"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right w-24 font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.title)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button 
            onClick={clearCart}
            className="mt-4 text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Clear Entire Cart
          </button>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 mt-8 lg:mt-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-4 mb-4">Order Summary</h3>
            
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            {/* Payment Section */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">M-PESA Phone Number</label>
                <input
                  type="tel"
                  placeholder="254712345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <button
                onClick={handleBuy}
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-colors ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {loading ? 'Processing...' : 'Pay with M-PESA'}
              </button>
            </div>

            {/* Messages */}
            {successMessage && (
              <div className="mt-4 p-3 bg-green-50 border border-green-100 text-green-700 text-sm rounded-lg text-center">
                {successMessage}
              </div>
            )}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg text-center">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;