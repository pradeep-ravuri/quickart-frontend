import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setProfileOpen(false);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img
          src={assets.logo}
          alt="QuicKart"
          className="h-20 w-35 object-contain"
        />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/collection">COLLECTION</NavLink>
        <NavLink to="/about">ABOUT</NavLink>
        <NavLink to="/contact">CONTACT</NavLink>
      </ul>

      <div className="flex items-center gap-6">
        {/* Search */}
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        {/* Profile */}
        <div className="relative">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="Profile"
            onClick={() => {
              if (!token) navigate("/login");
              else setProfileOpen((prev) => !prev);
            }}
          />

          {token && profileOpen && (
            <div className="absolute right-0 mt-3 bg-white shadow-md rounded z-50">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 text-gray-600">
                <p
                  onClick={() => {
                    navigate("/orders");
                    setProfileOpen(false);
                  }}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5" alt="Cart" />
          <span className="absolute -right-1 -bottom-1 w-4 h-4 text-[8px] bg-black text-white rounded-full flex items-center justify-center">
            {getCartCount()}
          </span>
        </Link>

        {/* Mobile menu */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>
    </div>
  );
};

export default NavBar;
