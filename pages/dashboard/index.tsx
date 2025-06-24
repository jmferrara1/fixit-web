import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

interface Plan { id: string; title?: string; createdAt: string }

export default function Dashboard() {
  const [plans, setPlans] = useState<Plan[] | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/plans');
      if (res.ok) setPlans(await res.json());
    }
    load();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {!plans ? (
        <p>Loading...</p>
      ) : plans.length === 0 ? (
        <p>No plans yet.</p>
      ) : (
        <ul className="space-y-2">
          {plans.map(p => (
            <li key={p.id}>
              <Link href={`/dashboard/${p.id}`} className="text-blue-500 underline">
                {p.title || p.id}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session) {
    return { redirect: { destination: '/auth/signin', permanent: false } };
  }
  return { props: {} };
};
