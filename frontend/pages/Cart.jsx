import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const cartItems = []; // ← Replace with actual cart logic (context or props)
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <img
            src="/cart.jpg" 
            alt="Empty cart"
            className="w-48 h-48 mb-6"
          />
          <p className="text-lg text-gray-700 mb-4 text-center">
            Looks like your cart is empty and sad... <br />
            Add Items to cheer it up !!
          </p>
          <button
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
            onClick={() => navigate('/')}
          >
            Go to pharmacy 
          </button>
        </div>
      ) : (
        <div className="p-4">Your cart items go here.</div>
      )}
    </div>
  );
}

export default Cart;
