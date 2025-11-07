import { createContext, useContext, useEffect, useState } from "react";
import { API_URI } from "../../config/config";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Fetching cart from backend
  const fetchCart = async () => {
    try {
      const respone = await fetch(`${API_URI}/api/cart`);

      const data = await respone.json();

      setCartItems(data.cartItems || []);
      
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Calculate total count (sum of quantities)
  const totalCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  // Reusable updater (after +, -, add, remove)
  const refreshCart = async () => {
    await fetchCart();
  };

  return (
    <CartContext.Provider value={{ cartItems, totalCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}
