export default function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Payment Receipt</h2>
        <p className="text-gray-700 mb-2">Name: {receipt.name}</p>
        <p className="text-gray-700 mb-2">Email: {receipt.email}</p>
        <p className="text-gray-700 mb-2">Total: ₹{receipt.total}</p>
        <p className="text-gray-500 text-sm mb-4">
          {new Date(receipt.timestamp).toLocaleString()}
        </p>
        <button
          onClick={onClose}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
