import { useRouter } from 'next/router';
import PlanViewer from '../../components/PlanViewer';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

export default function PlanPage() {
  const router = useRouter();
  const { planId } = router.query as { planId?: string };

  if (!planId) return <div>Loading...</div>;
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Plan {planId}</h1>
      <PlanViewer planId={planId} />
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
