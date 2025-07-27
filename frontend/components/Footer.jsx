import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
<<<<<<< HEAD
    <footer className="bg-gray-100 text-gray-700 pt-10 pb-6 px-4 sm:px-6 md:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
=======
    <footer className="bg-teal-600 text-white pt-10 pb-6 px-6 md:px-20">
      {/* Top Section */}
      <div className="grid md:grid-cols-4 gap-10">
>>>>>>> 93a6bff80e6155c58f3ff963114cfacb1d44c526
        {/* Column 1: Logo + Description */}
        <div>
          <img src="/logo.jpg" alt="Pharmacy Logo" className="h-12 mb-3" />
          <p className="text-sm text-teal-100 leading-relaxed">
            Your trusted online pharmacy delivering genuine medicines,
            healthcare products, and expert advice for your well-being.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline hover:text-teal-200">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-teal-200">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-teal-200">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-teal-200">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-teal-200">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline hover:text-teal-200">
                Medicines
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-teal-200">
                Personal Care
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-teal-200">
                Healthcare Devices
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-teal-200">
                Fitness & Supplements
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-teal-200">
                Ayurveda Products
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact + Social */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <p className="text-sm mb-2 text-teal-100">
            Email: support@pharmacy.com
          </p>
          <p className="text-sm mb-4 text-teal-100">Phone: +91 98765 43210</p>

<<<<<<< HEAD
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 text-white text-sm"><FaFacebookF /></a>
            <a href="#" className="bg-sky-400 p-2 rounded-full hover:bg-sky-500 text-white text-sm"><FaTwitter /></a>
            <a href="#" className="bg-pink-500 p-2 rounded-full hover:bg-pink-600 text-white text-sm"><FaInstagram /></a>
            <a href="#" className="bg-blue-700 p-2 rounded-full hover:bg-blue-800 text-white text-sm"><FaLinkedinIn /></a>
=======
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-white text-blue-600 p-2 rounded-full hover:bg-teal-100 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-white text-sky-500 p-2 rounded-full hover:bg-teal-100 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-white text-pink-500 p-2 rounded-full hover:bg-teal-100 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-white text-blue-700 p-2 rounded-full hover:bg-teal-100 transition"
            >
              <FaLinkedinIn />
            </a>
>>>>>>> 93a6bff80e6155c58f3ff963114cfacb1d44c526
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="mt-10 border-t border-teal-400 pt-4 text-center text-sm text-teal-100">
        © {new Date().getFullYear()} Your Pharmacy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
