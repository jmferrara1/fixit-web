import { useCart } from '../context/CartContext';
import EmptyState from '../components/EmptyState';

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal } = useCart();

  const checkout = () => {
    const query = items.map(i => `${i.sku}:${i.quantity}`).join(',');
    const url = `https://www.homedepot.com/checkout?items=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  if (items.length === 0) return <EmptyState message="Your cart is empty." />;

  return (
    <div className="p-4 sm:p-8 space-y-4">
      <h1 className="text-3xl font-bold">Cart</h1>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id} className="cart-item flex items-center justify-between border rounded p-2">
            <span>{item.name}</span>
            <div className="flex items-center gap-2">
              <button
                className="px-2 border rounded hover:bg-gray-100 focus:ring-2 focus:ring-steel-blue"
                onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="px-2 border rounded hover:bg-gray-100 focus:ring-2 focus:ring-steel-blue"
                onClick={() => updateQty(item.id, item.quantity + 1)}
              >
                +
              </button>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button
                className="text-red-500 hover:underline focus:ring-2 focus:ring-red-500"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="font-semibold">Subtotal: ${subtotal.toFixed(2)}</div>
      <button
        id="checkout"
        className="px-4 py-2 bg-electric-orange text-white rounded hover:bg-orange-600 focus:ring-2 focus:ring-electric-orange"
        onClick={checkout}
      >
        Checkout
      </button>
    </div>
  );
}
