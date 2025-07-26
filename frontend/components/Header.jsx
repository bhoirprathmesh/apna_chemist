import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMapPin,
  FiSettings,
  FiShoppingCart,
  FiSearch,
  FiGlobe,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [locations, setLocation] = useState("");
  const { t, i18n } = useTranslation();

  // Change language
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang); // Save language
  };

  useEffect(() => {
    document.documentElement.classList.remove("no-js");

    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=pk.eyJ1Ijoic2h1ZW5jZSIsImEiOiJjbG9wcmt3czMwYnZsMmtvNnpmNTRqdnl6In0.vLBhYMBZBl2kaOh1Fh44Bw`
          )
            .then((response) => response.json())
            .then((data) => {
              const cityFeature = data.features.find((context) =>
                context.place_type.includes("place")
              );
              const stateFeature = data.features.find((context) =>
                context.place_type.includes("region")
              );
              const city = cityFeature ? cityFeature.text : "";
              const state = stateFeature ? stateFeature.text : "";
              setLocation(
                city && state ? `${city}, ${state}` : "Location not found"
              );
            })
            .catch((error) => {
              console.error("Error:", error);
              setLocation("Unable to retrieve location");
            });
        },
        (error) => {
          console.error(error);
          setLocation("Geolocation not enabled");
        },
        options
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocation("Geolocation not supported");
    }
  }, []);

  return (
    <>
      <div className="w-full px-6 py-3 flex items-center justify-between bg-white">
        {/* Left: Logo + Address */}
        <div className="flex items-center space-x-8">
          <div>
            <Link to="/">
              <img src="/logo.jpg" alt="Logo" className="h-10 cursor-pointer" />
            </Link>
          </div>

          {/* Delivery Address */}
          <div className="flex items-center text-sm text-gray-700">
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
        <div className="w-[30rem] relative">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="w-full border border-gray-300 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-100"
          />
          <FiSearch className="absolute top-2.5 left-3 text-gray-500 text-lg" />
        </div>

        {/* Right: Language, Settings, Cart, Login */}
        <div className="flex items-center space-x-6 text-xl text-gray-700">
          {/* Language Selector with Icon */}
          <div className="flex items-center space-x-2">
            <FiGlobe className="text-gray-600 text-lg" />
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              className="border border-gray-300 rounded-full text-sm px-3 py-1.5 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
              value={i18n.language} // Ensures correct language is selected after refresh
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>
          </div>

          <FiSettings className="hover:text-teal-600 cursor-pointer" />
          <Link to="/cart">
            <div className="relative cursor-pointer">
              <FiShoppingCart className="hover:text-teal-600" />
              <span className="absolute -top-2 -right-2 text-xs text-white bg-red-500 rounded-full px-1">
                0
              </span>
            </div>
          </Link>
          <Link to="/login">
            <button className="text-sm px-4 py-1.5 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition">
              {t("login")}
            </button>
          </Link>
        </div>
      </div>

      <hr className="border-t border-gray-300" />
    </>
  );
};

export default Header;
