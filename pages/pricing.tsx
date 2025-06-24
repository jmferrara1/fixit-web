import PricingTable from '../components/PricingTable';

export default function Pricing() {
  const subscribe = async () => {
    const res = await fetch('/api/billing/create-checkout-session', { method: 'POST' });
    const json = await res.json();
    if (json.url) window.location.href = json.url;
  };
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <PricingTable />
    </div>
  );
}
