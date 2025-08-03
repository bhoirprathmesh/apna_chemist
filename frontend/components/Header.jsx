import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMapPin,
  FiSettings,
  FiShoppingCart,
  FiSearch,
  FiGlobe,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [locations, setLocation] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const popularSearches = [
    "Paracetamol",
    "Protein Powder",
    "Diabetes Care",
    "Sanitizer",
    "Baby Diapers",
    "Multivitamins",
  ];

  const categories = [
    "Personal Care",
    "Mom & Baby",
    "Health & Fitness",
    "Food & Beverages",
    "Sexual Wellness",
    "Pet Care",
  ];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=pk.eyJ1Ijoic2h1ZW5jZSIsImEiOiJjbG9wcmt3czMwYnZsMmtvNnpmNTRqdnl6In0.vLBhYMBZBl2kaOh1Fh44Bw`
          )
            .then((res) => res.json())
            .then((data) => {
              const cityFeature = data.features.find((c) =>
                c.place_type.includes("place")
              );
              const stateFeature = data.features.find((c) =>
                c.place_type.includes("region")
              );
              setLocation(
                cityFeature && stateFeature
                  ? `${cityFeature.text}, ${stateFeature.text}`
                  : "Location not found"
              );
            })
            .catch(() => setLocation("Unable to retrieve location"));
        },
        () => setLocation("Geolocation not enabled")
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  return (
    <>
      <div className="w-full px-4 md:px-6 py-3 flex items-center justify-between bg-white shadow-md relative">
        {/* Left: Logo & Location */}
        <div className="flex items-center space-x-4 md:space-x-8">
          <Link to="/">
            <img src="/logo.jpg" alt="Logo" className="h-10 cursor-pointer" />
          </Link>

          {/* Location (Hidden on mobile) */}
          <div className="hidden md:flex items-center text-sm text-gray-700">
            <FiMapPin className="mr-1 text-lg" />
            <div>
              <div className="text-xs text-gray-500">
                {t("deliveryAddress")}
              </div>
              <div className="flex items-center font-medium">
                <h5>{locations || t("loading")}</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:block w-[25rem] lg:w-[30rem] relative">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="w-full border border-gray-300 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-100"
          />
          <FiSearch className="absolute top-2.5 left-3 text-gray-500 text-lg" />
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4 md:space-x-6 text-xl text-gray-700">
          {/* Mobile Search */}
          <FiSearch
            className="block md:hidden cursor-pointer hover:text-teal-600"
            onClick={() => setSearchOpen(true)}
          />

          {/* Language Selector (Desktop Only) */}
          <div className="hidden md:flex items-center space-x-2">
            <FiGlobe className="text-gray-600 text-lg" />
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              className="border border-gray-300 rounded-full text-sm px-3 py-1.5 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
              value={i18n.language}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>
          </div>

          {/* Settings (Desktop Only) */}
          <FiSettings className="hidden md:block hover:text-teal-600 cursor-pointer" />

          {/* Cart */}
          <Link to="/cart">
            <div className="relative cursor-pointer">
              <FiShoppingCart className="hover:text-teal-600" />
              <span className="absolute -top-2 -right-2 text-xs text-white bg-red-500 rounded-full px-1">
                0
              </span>
            </div>
          </Link>

          {/* Login (Desktop Only) */}
          <Link to="/login" className="hidden md:block">
            <button className="text-sm px-4 py-1.5 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition">
              {t("login")}
            </button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="block md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-16 left-0 w-full z-50 p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <FiGlobe className="text-gray-600 text-lg" />
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-3 py-1.5 w-full"
              value={i18n.language}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>
          </div>
          <Link to="/login" className="block">
            <button className="w-full text-sm px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition">
              {t("login")}
            </button>
          </Link>
        </div>
      )}

      {/* Mobile Full-Screen Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col px-4 py-6 overflow-y-auto">
          {/* Top Bar */}
          <div className="flex justify-between w-full items-center mb-6">
            <h2 className="text-lg font-semibold text-teal-600">
              {t("search")}
            </h2>
            <FiX
              className="text-2xl cursor-pointer text-gray-700"
              onClick={() => setSearchOpen(false)}
            />
          </div>

          {/* Search Input */}
          <div className="relative w-full mb-6">
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="w-full border border-gray-300 rounded-full px-4 py-3 pl-10 text-base focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-100"
            />
            <FiSearch className="absolute top-3.5 left-3 text-gray-500 text-xl" />
          </div>

          {/* Popular Searches */}
          <div className="mb-6">
            <h3 className="text-gray-800 font-semibold mb-3">
              Popular Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((item, idx) => (
                <button
                  key={idx}
                  className="px-3 py-1.5 bg-gray-100 rounded-full text-sm hover:bg-teal-100 text-gray-700"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-3">
              Shop by Categories
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  className="w-full bg-gray-100 py-3 rounded-lg text-center text-sm font-medium hover:bg-teal-100"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
