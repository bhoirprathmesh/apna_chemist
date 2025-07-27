import React from 'react';
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
    <div className="w-full min-h-screen bg-white px-4 md:px-6 py-6">
      {/* Dropdown Category Buttons */}
      <div className="flex justify-center flex-wrap gap-3 mb-12 relative z-10">
        {categories.map((cat, idx) => (
          <div key={idx} className="relative group">
            <button
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 text-sm flex items-center gap-1 focus:outline-none"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {cat.label} <MdKeyboardArrowDown />
            </button>

            {/* Dropdown menu */}
            <div className="absolute top-12 left-0 hidden group-hover:block bg-white border border-gray-200 shadow-lg rounded-lg py-2 w-48 z-30">
              {cat.items.map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-100"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Hero Main Text */}
      <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-22rem)] px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-teal-700 mb-4">
          Welcome to Our Pharmacy
        </h1>
        <p className="text-gray-600 max-w-xl text-base sm:text-lg">
          Get genuine medicines, exciting offers, expert advice, and fast delivery all in one place.
        </p>
      </div>
    </div>
  );
}

export default Hero;
