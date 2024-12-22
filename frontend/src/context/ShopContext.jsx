import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_charges = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [reviews, setReviews] = useState([]);

  const submitReview = async (productId, review) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/reviews/submit`,
        { productId, ...review },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Review submitted successfully!");
        setReviews(response.data.reviews);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    }
  };

  const fetchReviews = async (productId) => {
    try {
      const response = await axios.get(`${backendUrl}/api/reviews/fetch`, {
        params: { productId },
      });
      if (response.data.success) {
        setReviews(response.data.reviews);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to fetch reviews");
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size before adding to the cart");
      return;
    }

    const cartData = { ...cartItems };

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to update cart on server");
      }
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (total, sizes) =>
        total +
        Object.values(sizes).reduce((sizeTotal, count) => sizeTotal + count, 0),
      0
    );
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = { ...cartItems };
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error updating quantity:", error);
        toast.error("Failed to update quantity");
      }
    }
  };

  const getCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const product = products.find((p) => p._id === itemId);
      if (!product) return total;

      const sizes = cartItems[itemId];
      const itemTotal = Object.values(sizes).reduce(
        (subTotal, count) => subTotal + product.price * count,
        0
      );
      return total + itemTotal;
    }, 0);
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  const getUserCart = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
      toast.error("Failed to fetch cart data");
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    getProductsData();
    getUserCart();
  }, [token]);

  const contextValue = {
    products,
    currency,
    delivery_charges,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    getCartCount,
    cartItems,
    setCartItems,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    submitReview,
    fetchReviews,
    reviews,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
