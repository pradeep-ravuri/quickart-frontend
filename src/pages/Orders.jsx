import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrderData(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.map((order) => (
          <div
            key={order._id}
            className="py-4 border-b text-gray-700 flex flex-col gap-6"
          >
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-start gap-6 text-sm">
                  <img
                    className="w-16 sm:w-20"
                    src={item.images?.[0] || ""}
                    alt={item.name}
                  />

                  <div>
                    <p className="sm:text-base font-medium">{item.name}</p>

                    <div className="flex items-center gap-3 mt-1 text-base">
                      <p>
                        {currency}
                        {item.price}
                      </p>
                      <p>Qty: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>

                    <p className="mt-1">
                      Date:{" "}
                      <span className="text-gray-400">
                        {new Date(order.date).toDateString()}
                      </span>
                    </p>

                    {/* ✅ PAYMENT STATUS FIX */}
                    <p className="mt-1">
                      Payment:
                      <span
                        className={`ml-1 font-medium ${
                          order.payment ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {order.payment ? "Paid" : "Pending"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="md:w-1/2 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    ></span>
                    <p className="text-sm md:text-base">{order.status}</p>
                  </div>

                  <button
                    onClick={loadOrderData}
                    className="border px-4 py-2 text-sm font-medium rounded-sm"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
