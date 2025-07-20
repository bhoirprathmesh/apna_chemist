import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';

function Hero() {
  const categories = [
    { label: "Personal Care", items: ["Skin Care", "Hair Care"] },
    { label: "Women Care", items: ["Feminine Hygiene", "Period Essentials"] },
    { label: "Ayurveda", items: ["Ayurveda Medicine", "Oils & Herbs"] },
    { label: "Home Essentials", items: ["Sanitizers", "Masks", "Disinfectants"] },
    { label: "Health Condition", items: ["Diabetes", "Heart Care"] },
    { label: "Nutritional Drinks & Supplements", items: ["Protein", "Immunity Boosters"] },
    { label: "Sexual Wellness", items: ["Condoms", "Lubricants"] },
  ];

  return (
    <div className="w-full min-h-screen bg-white px-6 py-4">
      {/* Top nav links */}
      <div className="flex justify-evenly flex-wrap items-center w-full max-w-6xl mx-auto gap-2 mb-6">
        <a href="#" className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 text-sm">
          All Medicines
        </a>
        <a href="#" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 text-sm">
          Offers
        </a>
        <a href="#" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 text-sm">
          Store Locator
        </a>
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 text-sm flex items-center gap-1"
        >
          <FaWhatsapp className="text-lg" />
          WhatsApp Connect
        </a>
        <a href="#" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 text-sm">
          Blogs
        </a>
      </div>

      {/* 🔽 Hoverable Dropdowns Section */}
      <div className="flex justify-center flex-wrap items-center gap-4 mb-12 relative z-10">
        {categories.map((cat, idx) => (
          <div key={idx} className="relative group">
            <button
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 text-sm flex items-center gap-1"
            >
              {cat.label} <MdKeyboardArrowDown />
            </button>

            {/* Dropdown menu on hover */}
            <div className="absolute top-12 left-0 hidden group-hover:block bg-gray-50 border shadow-lg rounded-lg p-3 text-sm min-w-[180px] z-20">
              {cat.items.map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="block py-1 px-2 rounded hover:bg-teal-100 text-gray-700"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Hero Section Content */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-20rem)] text-center">
        <h1 className="text-4xl font-bold text-teal-700 mb-4">Welcome to Our Pharmacy</h1>
        <p className="text-gray-600 max-w-xl">
          Get genuine medicines, exciting offers, expert advice, and fast delivery all in one place.
        </p>
      </div>
    </div>
  );
}

export default Hero;
