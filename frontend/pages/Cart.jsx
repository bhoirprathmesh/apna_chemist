import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const cartItems = []; // ← Replace with actual cart logic (context or props)
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center text-center py-16 max-w-md mx-auto">
          <img
            src="/cart.jpg"
            alt="Empty cart"
            className="w-36 sm:w-48 mb-6"
          />
          <p className="text-lg text-gray-700 mb-4">
            Looks like your cart is empty and sad... <br />
            Add Items to cheer it up !!
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
          >
            Go to Pharmacy
          </button>
        </div>
      ) : (
        <div className="p-4">Your cart items go here.</div>
      )}
    </div>
  );
}

export default Cart;
