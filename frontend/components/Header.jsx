import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiSettings, FiShoppingCart, FiSearch } from 'react-icons/fi';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const Header = () => {
  return (
    <>
      <div className="w-full px-6 py-3 flex items-center justify-between bg-white">
        {/* Left: Logo + Address */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div>
         <Link to="/">
           <img src="/logo.jpg" alt="Logo" className="h-10 cursor-pointer" />
         </Link>
              </div>

          {/* Delivery Address */}
          <div className="flex items-center text-sm text-gray-700">
            <FiMapPin className="mr-1 text-lg" />
            <div>
              <div className="text-xs text-gray-500">Delivery Address</div>
              <div className="flex items-center font-medium">
                Bhiwandi 421302 <MdOutlineKeyboardArrowDown className="ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="w-[30rem] relative">
          <input
            type="text"
            placeholder="Search 10000+ products"
            className="w-full border border-gray-300 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-100"
          />
          <FiSearch className="absolute top-2.5 left-3 text-gray-500 text-lg" />
        </div>

        {/* Right: Settings, Cart, Login */}
        <div className="flex items-center space-x-6 text-xl text-gray-700">
          <FiSettings className="hover:text-teal-600 cursor-pointer" />
           <Link to = "/cart">
          <div className="relative cursor-pointer">
            <FiShoppingCart className="hover:text-teal-600" />
            <span className="absolute -top-2 -right-2 text-xs text-white bg-red-500 rounded-full px-1">0</span>
          </div>
           </Link>

          {/* Login Button as Link */}
          <Link to="/login">
            <button className="text-sm px-4 py-1.5 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Light horizontal line */}
      <hr className="border-t border-gray-300" />
    </>
  );
};

export default Header;
