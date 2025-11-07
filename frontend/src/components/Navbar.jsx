import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CarContext";

export default function Navbar() {
  const { totalCount } = useCart();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
        
        <h1 className="text-2xl font-extrabold text-blue-900 mb-3 sm:mb-0">
          Vibe E-Com
        </h1>

        {/* Home */}
        <div className="flex gap-8 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium transition-all duration-200 border-b-2 ${
                isActive
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-600"
              }`
            }
          >
            Home
          </NavLink>

          {/* cart */}
          <NavLink
            to="/cart"
            className="relative flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-blue-600 transition"
          >
            <FaShoppingCart className="text-2xl" />
            <span>Cart</span>

            {totalCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {totalCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
