import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

export default function Plan() {
  const router = useRouter();
  const { planId } = router.query;
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Plan {planId}</h1>
      <p>Plan details go here.</p>
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
