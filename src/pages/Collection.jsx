import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // -------- TOGGLE CATEGORY --------
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // -------- TOGGLE SUBCATEGORY --------
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // -------- APPLY FILTERS --------
  const applyFilter = () => {
    let temp = [...products];

    // Search filter
    if (search) {
      temp = temp.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category.length > 0) {
      temp = temp.filter((item) => category.includes(item.category));
    }

    // SubCategory filter
    if (subCategory.length > 0) {
      temp = temp.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilteredProducts(temp);
  };

  // -------- SORT PRODUCTS --------
  const sortProducts = () => {
    let temp = [...filteredProducts];

    if (sortType === "low-high") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      temp.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(temp);
  };

  // Apply filters
  useEffect(() => {
    applyFilter();
  }, [products, search, category, subCategory]);

  // Apply sorting
  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* LEFT FILTERS */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* CATEGORY */}
        <div
          className={`border border-gray-300 px-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          {["Men", "Women", "Kids"].map((cat) => (
            <label key={cat} className="flex gap-2 text-sm text-gray-700">
              <input type="checkbox" value={cat} onChange={toggleCategory} />
              {cat}
            </label>
          ))}
        </div>

        {/* SUBCATEGORY */}
        <div
          className={`border border-gray-300 px-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
            <label key={type} className="flex gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                value={type}
                onChange={toggleSubCategory}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* RIGHT PRODUCTS */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.images}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
