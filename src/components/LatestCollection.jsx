import React from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  return (
    <div className="my-10">
      <div className="text-center py-8">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Explore our newest arrivals, carefully curated to match modern trends
          and everyday comfort. From casual wear to premium styles, discover
          products designed to elevate your wardrobe with quality and elegance.
        </p>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
        {products.slice(0, 8).map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.images}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
