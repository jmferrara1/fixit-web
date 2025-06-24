import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Spinner from './Spinner';
import { useCart } from '../context/CartContext';

interface Step {
  id: string;
  stepNumber: number;
  title: string;
  detail: string;
  imageHintUrl?: string;
  safetyNote?: string;
}

interface Part {
  id: string;
  name: string;
  quantity: number;
  partner: string;
  affiliateUrl: string;
}

interface PlanResponse {
  plan: { id: string; title?: string };
  steps: Step[];
  parts: Part[];
}

export default function PlanViewer({ planId }: { planId: string }) {
  const [data, setData] = useState<PlanResponse | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/plans/${planId}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    }
    if (planId) load();
  }, [planId]);

  if (!data)
    return (
      <div className="flex items-center justify-center p-4">
        <Spinner />
      </div>
    );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Steps</h2>
        <ol className="list-decimal list-inside space-y-4">
          {data.steps.map(step => (
            <li key={step.id} className="border rounded p-4">
              <h3 className="font-semibold mb-2">
                {step.stepNumber}. {step.title}
              </h3>
              <p className="mb-2">{step.detail}</p>
              {step.imageHintUrl && (
                <Image
                  src={step.imageHintUrl}
                  alt="hint"
                  width={400}
                  height={300}
                  className="mb-2"
                />
              )}
              {step.safetyNote && (
                <p className="text-sm text-red-600">Safety: {step.safetyNote}</p>
              )}
            </li>
          ))}
        </ol>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Parts</h2>
        <ul className="list-disc list-inside space-y-2">
          {data.parts.map(part => (
            <li key={part.id} className="flex items-center gap-2">
              <span>
                {part.name} x{part.quantity}
              </span>
              <Link
                href={part.affiliateUrl}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Buy at {part.partner}
              </Link>
              <button
                className="px-2 py-1 bg-steel-blue text-white rounded hover:bg-blue-700 focus:ring-2 focus:ring-steel-blue"
                onClick={() =>
                  addItem({ id: part.id, name: part.name, price: 1, sku: part.id, quantity: 1 })
                }
              >
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
