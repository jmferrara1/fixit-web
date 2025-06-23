import Head from 'next/head';
import Link from 'next/link';
import ChatWindow from '../components/ChatWindow';
import PhotoUploader from '../components/PhotoUploader';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-4">
      <Head>
        <title>Fixit</title>
      </Head>
      <h1 className="text-4xl font-bold">Fixit Web</h1>
      <Link href="/dashboard" className="text-blue-500">Dashboard</Link>
      <div className="w-full max-w-md h-96">
        <ChatWindow />
      </div>
      <PhotoUploader />
    </div>
  );
}
