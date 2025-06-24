import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 space-y-4">
      <Head>
        <title>Fixit</title>
      </Head>
      <h1 className="text-4xl font-bold">Fixit Web</h1>
      <Link href="/dashboard" className="text-blue-500">Dashboard</Link>
      {/* Advanced features disabled for minimal deploy */}
    </div>
  );
}
