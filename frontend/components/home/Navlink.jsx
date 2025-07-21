import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

function Navlink() {
  return (
    <div className="py-4 px-2 bg-white">
      {/* Top nav links container */}
      <div className="flex justify-evenly flex-wrap items-center w-full max-w-6xl mx-auto gap-3">
        <a
          href="#"
          className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 text-sm transition duration-200"
        >
          All Medicines
        </a>
        <a
          href="#"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 text-sm transition duration-200"
        >
          Offers
        </a>
        <a
          href="#"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 text-sm transition duration-200"
        >
          Store Locator
        </a>
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 text-sm flex items-center gap-2 transition duration-200"
        >
          <FaWhatsapp className="text-lg" />
          WhatsApp Connect
        </a>
        <a
          href="#"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 text-sm transition duration-200"
        >
          Blogs
        </a>
      </div>
    </div>
  );
}

export default Navlink;
