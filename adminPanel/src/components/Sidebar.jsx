import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen bg-gray-100 border-r shadow-lg">
      <div className="flex flex-col gap-4 pt-8 pl-[15%] text-[15px]">
        {/* Add Items */}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all ${
              isActive
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-50 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
            }`
          }
          to="/add"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="Add Icon" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        {/* List Items */}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all ${
              isActive
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-50 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
            }`
          }
          to="/list"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="List Icon" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        {/* Orders */}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all ${
              isActive
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-50 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
            }`
          }
          to="/orders"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="Orders Icon" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
