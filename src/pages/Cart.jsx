import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (!products.length || !cartItems) return;

    const tempData = [];

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const qty = cartItems[itemId][size];
        if (qty > 0) {
          tempData.push({
            _id: itemId,
            size,
            quantity: qty,
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems, products]);

  const handleQuantityChange = (itemId, size, value) => {
    const qty = Number(value);
    if (!qty || qty < 1) return;
    updateQuantity(itemId, size, qty);
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.length === 0 && (
          <p className="text-gray-500 mt-10">Your cart is empty.</p>
        )}

        {cartData.map((item) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          if (!productData) return null;

          return (
            <div
              key={`${item._id}-${item.size}`}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  src={productData.images[0]}
                  className="w-16 sm:w-20"
                  alt={productData.name}
                />

                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>

                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item._id, item.size, e.target.value)
                }
                className="border max-w-12 px-2 py-1"
              />

              <img
                src={assets.bin_icon}
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                alt="Remove"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              disabled={cartData.length === 0}
              onClick={() => navigate("/place-order")}
              className={`text-sm my-8 px-8 py-3 ${
                cartData.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white"
              }`}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
