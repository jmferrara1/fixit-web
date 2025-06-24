import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { useEffect, useState } from 'react';

export default function Admin() {
  const [partners, setPartners] = useState([] as any[]);
  const [metrics, setMetrics] = useState<{ chats: number; plans: number } | null>(null);
  useEffect(() => {
    async function load() {
      const p = await fetch('/api/admin/partners').then(r => r.json());
      setPartners(p);
      const m = await fetch('/api/admin/metrics').then(r => r.json());
      setMetrics(m);
    }
    load();
  }, []);
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Admin</h1>
      <table className="border min-w-full">
        <thead><tr><th className="border p-2">Partner</th><th className="border p-2">API Key</th></tr></thead>
        <tbody>
          {partners.map(p => (
            <tr key={p.id}><td className="border p-2">{p.name}</td><td className="border p-2">{p.apiKey}</td></tr>
          ))}
        </tbody>
      </table>
      {metrics && (
        <div>
          <div className="h-4 bg-gray-200 w-full">
            <div className="bg-steel-blue h-4" style={{ width: `${metrics.plans}%` }} />
          </div>
          <div className="h-4 bg-gray-200 w-full mt-2">
            <div className="bg-electric-orange h-4" style={{ width: `${metrics.chats}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session || !(session.user as any).isAdmin) {
    return { redirect: { destination: '/auth/signin', permanent: false } };
  }
  return { props: {} };
};
