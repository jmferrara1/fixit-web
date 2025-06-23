import { useRouter } from 'next/router';

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
