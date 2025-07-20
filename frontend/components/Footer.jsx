import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-10 pb-6 px-6 md:px-20">
      <div className="grid md:grid-cols-4 gap-8">
        {/* Column 1: Logo + Description */}
        <div>
          <img src="/logo.jpg" alt="Pharmacy Logo" className="h-12 mb-3" />
          <p className="text-sm">
            We provide genuine medicines, healthcare products, and expert advice for your wellness needs.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-teal-600">Home</a></li>
            <li><a href="#" className="hover:text-teal-600">About Us</a></li>
            <li><a href="#" className="hover:text-teal-600">Contact</a></li>
            <li><a href="#" className="hover:text-teal-600">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-teal-600">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-teal-600">Medicines</a></li>
            <li><a href="#" className="hover:text-teal-600">Personal Care</a></li>
            <li><a href="#" className="hover:text-teal-600">Healthcare Devices</a></li>
            <li><a href="#" className="hover:text-teal-600">Fitness & Supplements</a></li>
            <li><a href="#" className="hover:text-teal-600">Ayurveda Products</a></li>
          </ul>
        </div>

        {/* Column 4: Contact + Social */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <p className="text-sm mb-2">Email: support@pharmacy.com</p>
          <p className="text-sm mb-4">Phone: +91 98765 43210</p>

          <div className="flex space-x-4 text-white">
            <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700"><FaFacebookF /></a>
            <a href="#" className="bg-sky-400 p-2 rounded-full hover:bg-sky-500"><FaTwitter /></a>
            <a href="#" className="bg-pink-500 p-2 rounded-full hover:bg-pink-600"><FaInstagram /></a>
            <a href="#" className="bg-blue-700 p-2 rounded-full hover:bg-blue-800"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="mt-10 border-t border-gray-300 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Your Pharmacy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
