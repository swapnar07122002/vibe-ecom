import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { API_URI } from "../../config/config";
import { useCart } from "../context/CarContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { cartItems, refreshCart } = useCart(); // global cart context

  // fetch all products
  const fetchProducts = async () => {
    const respone = await fetch(`${API_URI}/api/products`);

    const data = await respone.json();

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add or increment by 1
  const addToCart = async (productId) => {
    await fetch(`${API_URI}/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: 1 }),
    });
    await refreshCart(); // instantly updates global cart count
  };

  // Decrement by 1
  const decrementCart = async (productId) => {
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
      await fetch(`${API_URI}/api/cart/${cartItem._id}`, { method: "DELETE" });
    }

    await refreshCart(); // update instantly
  };

  // Increment (same as add)
  const incrementCart = async (productId) => {
    await addToCart(productId);
  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          
          const cartItem = cartItems.find(
            (ci) => String(ci.productId._id || ci.productId) === String(product._id)
          );
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <ProductCard
              key={product._id}
              product={product}
              quantity={quantity}
              onAdd={() => addToCart(product._id)}
              onIncrement={() => incrementCart(product._id)}
              onDecrement={() => decrementCart(product._id)}
            />
          );
        })}
      </div>
    </div>
  );
}