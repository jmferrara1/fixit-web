import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

  if (!data) return <div>Loading plan...</div>;

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
            <li key={part.id}>
              {part.name} x{part.quantity} {' '}
              <Link href={part.affiliateUrl} target="_blank">
                Buy at {part.partner}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
