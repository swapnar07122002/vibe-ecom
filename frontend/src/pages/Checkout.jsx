import { useState, useEffect } from "react";
import ReceiptModal from "../components/ReceiptModal";
import { API_URI } from "../../config/config";

export default function Checkout() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [receipt, setReceipt] = useState(null);

  // fetch cart items before checkout
  const fetchCart = async () => {
    const res = await fetch(`${API_URI}/api/cart`);

    const data = await res.json();

    setCartItems(data.cartItems || []);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleCheckout = async (e) => {
    e.preventDefault();

    // send cartItems along with name & email
    const res = await fetch(`${API_URI}/api/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, cartItems }),
    });

    const data = await res.json();

    if (res.ok) {
      setReceipt(data.receipt);
      
    } else {
      alert(data.message || "Checkout failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Checkout</h1>

      <form
        onSubmit={handleCheckout}
        className="bg-white shadow-md rounded-lg p-6 w-96"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition cursor-pointer"
        >
          Confirm Checkout
        </button>
      </form>

      <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />
    </div>
  );
}
