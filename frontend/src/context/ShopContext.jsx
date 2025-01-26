import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets"; // Adjust this import if needed
import axios from "axios";
import { use } from "react";
import { toast } from 'react-toastify';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [product, setProduct] = useState([]);
  const [token, setToken] = useState("");
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Add to cart function, correctly updating the cart state
  const addToCart = (itemId, size) => {
    setCartItem((prevCart) => {
      const updatedCart = { ...prevCart };
      if (!updatedCart[itemId]) updatedCart[itemId] = {};
      if (!updatedCart[itemId][size]) updatedCart[itemId][size] = 0;
      updatedCart[itemId][size] += 1;
      return updatedCart;
    });
  };

  // Remove from cart function
  const removeFromCart = (itemId, size) => {
    setCartItem((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[itemId]?.[size]) {
        delete updatedCart[itemId][size];
        if (Object.keys(updatedCart[itemId]).length === 0) {
          delete updatedCart[itemId];
        }
      }
      return updatedCart;
    });
    if (token) {
      try {
        axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: token })
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  //upade qunatty
  const updateQunatity = async (itemId, size, quantity) => {
    setCartItem((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[itemId]?.[size]) {
        updatedCart[itemId][size] = quantity;
      }
      return updatedCart;
    });
    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  // Calculate total cart item count
  const getCartCount = () => {
    return Object.values(cartItem).reduce((count, sizes) => {
      return (
        count +
        Object.values(sizes).reduce((sum, quantity) => sum + quantity, 0)
      );
    }, 0);
  };

  const incrementCartItem = (productId, size) => {
    setCartItem((prevCart) => ({
      ...prevCart,
      [productId]: {
        ...prevCart[productId],
        [size]: (prevCart[productId]?.[size] || 0) + 1,
      },
    }));
  };

  const decrementCartItem = (productId, size) => {
    setCartItem((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId]?.[size] > 1) {
        updatedCart[productId][size] -= 1;
      } else {
        delete updatedCart[productId][size];
        if (Object.keys(updatedCart[productId]).length === 0) {
          delete updatedCart[productId];
        }
      }
      return updatedCart;
    });
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    Object.entries(cartItem).forEach(([itemId, sizes]) => {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo) {
        Object.entries(sizes).forEach(([size, quantity]) => {
          totalAmount += itemInfo.price * quantity;
        });
      }
    });
    return totalAmount;
  };
  // 2-varianti
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      console.log("API Response:", response); // Log the full response
      if (response.data.success) {
        console.log("Products Data:", response.data.products); // Check if products are inside the response
        setProduct(response.data.products);
      } else {
        console.log("Error fetching products:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // 1-varianti 
  // const getProductsData = async () => {
  //   try {
  //     const response = await axios.get(backendUrl + "/api/product/list");
  //     console.log(response.data);
  //     if (response.data.success) {
  //       setProduct(response.data.products);
  //     } else {
  //       console.log("Error fetching products:", response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };
  const getUserCart = async (token) => {
    try {
      const response = await axios.get(backendUrl + "/api/cart/list", {}, { headers: { token } });
      if (response.data.success) {
        setCartItem(response.data.cart);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // toast.error(error.message);
    }
  };
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    } else {
      console.log("No token found");
    }
  }, []);
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    setCartItem,
    addToCart,
    setCartItem,
    removeFromCart,
    getCartCount,
    incrementCartItem,
    decrementCartItem,
    getCartAmount,
    backendUrl,
    token,
    setToken,
    updateQunatity,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
