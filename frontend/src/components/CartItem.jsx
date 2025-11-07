export default function CartItem({ item, onIncrement, onDecrement, onRemove }) {
  return (
    <div className="flex justify-between items-center bg-white shadow rounded-lg p-4 mb-3">

      {/* Left side image, name, price */}
      <div className="flex items-center gap-4">
        {item.productId.image && (
          <img
            src={item.productId.image}
            alt={item.productId.name}
            className="w-16 h-16 object-cover rounded-md"
          />
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{item.productId.name}</h3>
          <p className="text-gray-500">₹{item.productId.price}</p>
        </div>
      </div>

      {/* Right side quantity controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onDecrement(item.productId._id)}
          className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
        >
          -
        </button>

        <div className="px-3 py-1 border rounded-md min-w-[48px] text-center">
          {item.quantity}
        </div>

        <button
          onClick={() => onIncrement(item.productId._id)}
          className="px-3 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 cursor-pointer"
        >
          +
        </button>

      </div>
    </div>
  );
}
