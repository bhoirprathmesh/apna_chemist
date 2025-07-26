import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-3 shadow hover:shadow-lg transition cursor-pointer">
      <img
        src={product.image}
        alt={product.name}
        className="h-32 w-full object-cover rounded"
      />
      <h3 className="mt-2 font-medium">{product.name}</h3>
      <p className="text-teal-600 font-bold">₹{product.price}</p>
      <button className="mt-2 px-4 py-1.5 bg-teal-600 text-white rounded hover:bg-teal-700">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
