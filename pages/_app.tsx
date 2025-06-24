import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
// If you ever re-enable Sentry, uncomment the import below:
// import * as Sentry from '@sentry/nextjs';

import Navbar from '../components/Navbar';
import { CartProvider } from '../context/CartContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // Remove the entire useEffect block if you’re not using Sentry:
  useEffect(() => {
    // If you re-enable Sentry later, restore the init & event handlers here.
  }, [router.events]);

  return (
    <SessionProvider session={(pageProps as any).session}>
      <CartProvider>
        <Navbar />
        <Component {...pageProps} />
      </CartProvider>
    </SessionProvider>
  );
}
