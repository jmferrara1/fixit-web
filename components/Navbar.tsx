import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 text-white flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/features">Features</Link>
      <Link href="/pricing">Pricing</Link>
      <Link href="/dashboard">Dashboard</Link>
    </nav>
  );
}
