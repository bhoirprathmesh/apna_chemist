import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

function Products() {
  const { categoryName } = useParams();
  const filtered = products.filter((p) => p.category === categoryName);

  return (
    <div className="px-6 py-6">
      <h2 className="text-2xl font-semibold mb-4">{categoryName}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}

export default Products;
