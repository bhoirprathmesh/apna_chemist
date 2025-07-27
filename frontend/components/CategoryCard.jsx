import React from "react";

const CategoryCard = ({ category }) => {
  return (
    <div className="border rounded-lg p-3 shadow hover:shadow-lg transition cursor-pointer">
      <img
        src={category.image}
        alt={category.name}
        className="h-32 w-full object-cover rounded"
      />
      <h3 className="text-center mt-2 font-medium">{category.name}</h3>
    </div>
  );
};

export default CategoryCard;
