export default function ProductCard({ product, quantity = 0, onAdd, onIncrement, onDecrement }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center hover:shadow-lg transition duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-40 h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
      <p className="text-gray-500 mt-1">₹{product.price}</p>

      {quantity > 0 ? (
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={onDecrement}
            className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
          >
            -
          </button>

          <div className="px-3 py-1 border rounded-md min-w-[48px] text-center">{quantity}</div>

          <button
            onClick={onIncrement}
            className="px-3 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 cursor-pointer"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={onAdd}
          className="mt-3 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition cursor-pointer"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
