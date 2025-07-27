import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

function Navlink() {
  return (
    <div className="py-4 px-2 bg-white">
      {/* Top nav links container */}
      <div className="flex justify-center flex-wrap items-center gap-3 max-w-6xl mx-auto">
        {[
          { label: "All Medicines", href: "#", type: "primary" },
          { label: "Offers", href: "#", type: "secondary" },
          { label: "Store Locator", href: "#", type: "secondary" },
          {
            label: "WhatsApp Connect",
            href: "https://wa.me/919999999999",
            type: "whatsapp",
            icon: <FaWhatsapp className="text-lg" />,
            external: true,
          },
          { label: "Blogs", href: "#", type: "secondary" },
        ].map((link, i) => (
          <a
            key={i}
            href={link.href}
            target={link.external ? "_blank" : "_self"}
            rel={link.external ? "noopener noreferrer" : undefined}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full transition duration-200 ${
              link.type === "primary"
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : link.type === "whatsapp"
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {link.icon}
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Navlink;
