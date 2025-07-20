import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

function Hero() {
  return (
    <div className="w-full h-screen bg-white px-6 py-4">
      {/* Top nav links */}
      <div className="flex flex-wrap justify-center md:justify-start gap- mb-10 ">
        <a href="#" className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition text-sm">
          All Medicines
        </a>

        <a href="#" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm">
          Offers
        </a>

        <a href="#" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm">
          Store Locator
        </a>

        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition text-sm flex items-center gap-1"
        >
          <FaWhatsapp className="text-lg" />
          WhatsApp Connect
        </a>

        <a href="#" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm">
          Blogs
        </a>
      </div>

      {/* Center content (optional) */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] text-center">
        <h1 className="text-4xl font-bold text-teal-700 mb-4">Welcome to Our Pharmacy</h1>
        <p className="text-gray-600 max-w-xl">
          Get genuine medicines, exciting offers, expert advice, and fast delivery all in one place.
        </p>
      </div>
    </div>
  );
}

export default Hero;
