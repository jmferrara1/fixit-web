import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { items, subtotal } = useCart();
  const count = items.reduce((t, i) => t + i.quantity, 0);

  return (
    <nav className="p-4 sm:px-6 bg-gray-800 text-white flex gap-4 items-center">
      <Link href="/">Home</Link>
      <Link href="/features">Features</Link>
      <Link href="/pricing">Pricing</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link
        href="/cart"
        className="ml-auto hover:text-electric-orange focus:outline-none focus:ring-2 focus:ring-electric-orange"
      >
        🛒 {count} (${subtotal.toFixed(2)})
      </Link>
    </nav>
  );
}
