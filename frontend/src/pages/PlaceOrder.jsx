import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [error, setError] = useState(null);
  const { backendUrl, token, cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const handleChange = (value) => {
    setPhone(value);
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + "/api/order/verifyRazorpay", response, { headers: { token } });
          if (data.success) {
            navigate("/order");
            setCartItem({});
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });
          if (response.data.success) {
            setCartItem({});
            navigate("/order");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(backendUrl + "/api/order/stripe", orderData, { headers: { token } });
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(backendUrl + "/api/order/razorpay", orderData, { headers: { token } });
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;

        default:
          break;
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while placing the order.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:pt-1 min-h-[80vh] border-t">
      {/* Left side: Delivery Information */}
      <div className="flex flex-col w-full gap-4 sm:max-w-[480px]">
        <div className="my-3 text-xl font-bold sm:text-2xl">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <input
            required
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            placeholder="First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            required
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            placeholder="Last Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <input
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder="Email Address"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          required
          type="text"
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          placeholder="Street"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <div className="flex flex-col gap-4 md:flex-row">
          <input
            required
            type="text"
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            placeholder="City"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            required
            type="text"
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            placeholder="State"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <input
            required
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={onChangeHandler}
            placeholder="Zip Code"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            required
            type="text"
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            placeholder="Country"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="w-full py-2 ">
          <PhoneInput
            inputStyle={{
              width: "100%",
              fontSize: "16px",
              transition: "border-color 0.3s ease",
            }}
            country={"uz"} // Default davlat kodi (O'zbekiston)
            value={phone}
            onChange={handleChange}
            inputClass="w-full"
            buttonStyle={{
              border: "1px solid #ccc",
              borderRadius: "8px 0 0 8px",
            }}
            placeholder="+998 94 123 77 77"
          />
          {/* <p className="mt-2 text-gray-600">Tanlangan telefon raqami: {phone}</p> */}
        </div>
      </div>

      {/* Right side: Payment Method & Cart Total */}
      <div className="w-full mt-14 sm:w-auto">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <div className="flex flex-col gap-3 lg:flex-row lg:justify-start">
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-2 p-2 px-3 border cursor-pointer ${method === "cod" ? "border-green-400" : ""}`}
            >
              <p
                className={`rounded-full border border-gray-400 min-w-[20px] min-h-[20px] ${method === "cod" ? "bg-green-400" : ""}`}
              ></p>
              <p className="mx-4 text-sm font-medium text-gray-500">Cash On Delivery</p>
            </div>
            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              className="px-6 py-3 text-white uppercase transition-all duration-300 ease-in-out bg-black rounded-md hover:bg-gray-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:scale-95"
            >
              Place Order
            </button>
          </div>

        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
