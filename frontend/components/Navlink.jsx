import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";

function Navlink() {
  const [openCategory, setOpenCategory] = useState(null);

  const navRef = useRef();

  const categories = [
    {
      label: "Mom & Baby",
      items: [
        "Diapers & Wipes",
        "Baby Food & Formula",
        "Baby Skincare & Grooming",
        "Feeding Bottles & Accessories",
        "Maternity Essentials",
        "Baby Health & Safety Products",
      ],
    },
    {
      label: "Personal Care",
      items: [
        "Skin Care",
        "Hair Care",
        "Bath & Body",
        "Oral Care",
        "Men's Grooming & Shaving",
        "Deodorants & Perfumes",
        "Face Wash & Cleansers",
      ],
    },
    {
      label: "Health & Fitness",
      items: [
        "Vitamins & Supplements",
        "Nutrition & Energy Drinks",
        "Weight Management Products",
        "Protein & Muscle Gainers",
        "Joint & Bone Health",
        "Immunity Boosters",
      ],
    },
    {
      label: "Elderly Care",
      items: [
        "Adult Diapers",
        "Mobility Aids (Walking Sticks, Wheelchairs)",
        "Blood Pressure & Glucose Monitors",
        "Hearing Aids",
        "Support Belts & Braces",
      ],
    },
    {
      label: "Food & Beverages",
      items: [
        "Healthy Snacks",
        "Organic Foods",
        "Breakfast Essentials",
        "Dry Fruits & Nuts",
        "Beverages & Health Drinks",
        "Sugar Substitutes",
      ],
    },
    {
      label: "Self Care & First Aid",
      items: [
        "Sanitizers & Disinfectants",
        "Face Masks",
        "Thermometers",
        "First Aid Kits",
        "Feminine Hygiene",
        "Pain Relief Sprays & Balms",
        "Health Devices (Oximeters, BP Monitors)",
      ],
    },
    {
      label: "Pet Supplies",
      items: [
        "Pet Food (Dog & Cat)",
        "Pet Grooming Products",
        "Pet Medicines & Supplements",
        "Pet Hygiene Products",
        "Pet Toys & Accessories",
      ],
    },
    {
      label: "Home Care",
      items: [
        "Cleaning & Laundry Care",
        "Air Fresheners & Insect Repellents",
        "Kitchen & Bathroom Cleaners",
        "Surface & Multi-Purpose Cleaners",
      ],
    },
    {
      label: "Sexual Wellness",
      items: [
        "Condoms & Lubricants",
        "Intimate Hygiene",
        "Pregnancy & Fertility Kits",
        "Performance & Stamina Boosters",
      ],
    },
    {
      label: "Ortho & Rehab",
      items: [
        "Knee, Back & Neck Supports",
        "Elbow & Shoulder Braces",
        "Abdominal Belts",
        "Wheelchairs & Walkers",
        "Crutches & Rehabilitation Aids",
        "Physiotherapy Equipment",
      ],
    },
  ];

  const toggleCategory = (idx) => {
    setOpenCategory(openCategory === idx ? null : idx);
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenCategory(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={navRef} className="w-full bg-teal-600 shadow-md z-10 relative">
      <div className="w-full flex flex-wrap justify-center items-center px-4 py-3">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 w-full">
          {categories.map((cat, idx) => (
            <div key={idx} className="relative">
              {/* Button */}
              <button
                onClick={() => toggleCategory(idx)}
                className="flex items-center gap-1 text-white text-sm md:text-base font-medium hover:text-gray-100 whitespace-nowrap"
              >
                {cat.label}
                <MdKeyboardArrowDown className="text-lg" />
              </button>

              {/* Dropdown */}
              {openCategory === idx && (
                <div className="absolute top-10 left-0 bg-white border shadow-lg rounded-lg p-3 text-sm min-w-[220px] z-20">
                  {cat.items.map((item, i) => (
                    <Link
                      key={i}
                      to={`/products/${item}`}
                      className="block py-1.5 px-2 rounded hover:bg-teal-100 text-gray-800"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navlink;
