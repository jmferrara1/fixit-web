import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Navbar from '../components/Navbar';
import { CartProvider } from '../context/CartContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={(pageProps as any).session}>
      <CartProvider>
        <Navbar />
        <Component {...pageProps} />
      </CartProvider>
    </SessionProvider>
  );
}
