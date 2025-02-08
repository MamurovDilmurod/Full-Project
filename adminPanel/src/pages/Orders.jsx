import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-semibold text-gray-800">Orders</h3>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-200 p-5 md:p-8 rounded-lg hover:shadow-lg transition-shadow text-sm text-gray-700"
          >
            {/* Order Icon */}
            <img
              className="object-contain w-12 h-12"
              src={assets.parcel_icon}
              alt="Parcel Icon"
            />

            {/* Order Details */}
            <div>
              <p>
                <strong>Name:</strong> {order.address?.firstName}{" "}
                {order.address?.lastName}
              </p>
              <p>
                <strong>Street:</strong> {order.address?.street || "N/A"}
              </p>
              <p>
                <strong>City:</strong> {order.address?.city || "N/A"}
              </p>
              <p>
                <strong>State:</strong> {order.address?.state || "N/A"}
              </p>
              <p>
                <strong>Country:</strong> {order.address?.country || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {order.address?.phone || "N/A"}
              </p>
            </div>

            {/* Order Info */}
            <div>
              <p className="font-medium text-gray-800">
                Items: {order.items.length}
              </p>
              <p className="mt-2 text-gray-600">
                Method: {order.paymentMethod}
              </p>
              <p
                className={`mt-1 font-medium ${
                  order.payment ? "text-green-600" : "text-green-600"
                }`}
              >
                Payment: {order.payment ? "Done" : "Done"}
              </p>
              <p className="mt-2 text-gray-600">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* Total Amount */}
            <p className="text-lg font-semibold text-gray-900">
              {currency}
              {order.amount}
            </p>

            {/* Status Dropdown */}
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="p-2 font-medium text-gray-700 border border-gray-300 rounded-md hover:shadow-sm focus:outline-none"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
