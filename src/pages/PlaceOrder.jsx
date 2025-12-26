import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value.trim() }));
  };

  const validateAddress = () => {
    for (const key in formData) {
      if (!formData[key]) {
        toast.error("Please fill all address fields");
        return false;
      }
    }
    return true;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    if (!validateAddress()) return;

    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          const qty = cartItems[itemId][size];
          if (qty > 0) {
            const product = products.find((p) => p._id === itemId);
            if (!product) continue;

            orderItems.push({
              name: product.name,
              price: product.price,
              size,
              quantity: qty,
            });
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      const orderData = {
        address: {
          ...formData,
          zipcode: String(formData.zipcode),
          phone: String(formData.phone),
        },
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      if (method !== "cod") {
        toast.error("Only Cash on Delivery is supported currently");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        orderData,
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* LEFT */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            name="firstName"
            required
            onChange={onChangeHandler}
            placeholder="First name"
            className="input"
          />
          <input
            name="lastName"
            required
            onChange={onChangeHandler}
            placeholder="Last name"
            className="input"
          />
        </div>

        <input
          name="email"
          type="email"
          required
          onChange={onChangeHandler}
          placeholder="Email"
          className="input"
        />
        <input
          name="street"
          required
          onChange={onChangeHandler}
          placeholder="Street"
          className="input"
        />

        <div className="flex gap-3">
          <input
            name="city"
            required
            onChange={onChangeHandler}
            placeholder="City"
            className="input"
          />
          <input
            name="state"
            required
            onChange={onChangeHandler}
            placeholder="State"
            className="input"
          />
        </div>

        <div className="flex gap-3">
          <input
            name="zipcode"
            required
            onChange={onChangeHandler}
            placeholder="Zipcode"
            className="input"
          />
          <input
            name="country"
            required
            onChange={onChangeHandler}
            placeholder="Country"
            className="input"
          />
        </div>

        <input
          name="phone"
          required
          onChange={onChangeHandler}
          placeholder="Phone"
          className="input"
        />
      </div>

      {/* RIGHT */}
      <div className="mt-8">
        <CartTotal />

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          <div className="flex gap-3">
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`h-3.5 w-3.5 rounded-full border ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              />
              <p className="text-sm">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
