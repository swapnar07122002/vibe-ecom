import { useCart } from "../context/CarContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import { API_URI } from "../../config/config";

export default function Cart() {
  const { cartItems, refreshCart } = useCart(); // global cart
  const navigate = useNavigate();

  // Calculate total from cart context
  const total = cartItems.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0
  );

  // Increment quantity
  const increment = async (productId) => {
    await fetch(`${API_URI}/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: 1 }),
    });

    await refreshCart(); // instantly updates global cart 
  };

  // Decrement or remove if quantity = 1
  const decrement = async (productId) => {
    const cartItem = cartItems.find(
      (ci) => String(ci.productId._id || ci.productId) === String(productId)
    );
    if (!cartItem) return;

    if (cartItem.quantity > 1) {
      await fetch(`${API_URI}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: -1 }),
      });

    } else {
      await fetch(`${API_URI}/api/cart/${cartItem._id}`, {
        method: "DELETE",
      });
    }

    await refreshCart();
  };

  

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty 🛒</p>
      ) : (
        <div className="max-w-3xl mx-auto">
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              onIncrement={increment}
              onDecrement={decrement}
            />
          ))}

          {/* Total Price */}
          <div className="flex justify-between items-center mt-6 text-lg font-semibold">
            <p>Total:</p>
            <p>₹{total}</p>
          </div>

          {/* Checkout Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => navigate("/checkout")}
              className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
