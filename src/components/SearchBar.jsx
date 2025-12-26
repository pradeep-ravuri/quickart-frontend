import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const location = useLocation();
  const navigate = useNavigate();

  // When user types search outside collection → redirect
  useEffect(() => {
    if (search && !location.pathname.includes("/collection")) {
      navigate("/collection");
    }
  }, [search]);

  if (!showSearch) return null;

  return (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="flex-1 outline-none bg-transparent text-sm"
          autoFocus
        />
        <img src={assets.search_icon} className="w-4" alt="Search" />
      </div>

      <img
        src={assets.cross_icon}
        onClick={() => {
          setShowSearch(false);
          setSearch("");
        }}
        className="inline w-3 cursor-pointer"
        alt="Close"
      />
    </div>
  );
};

export default SearchBar;
