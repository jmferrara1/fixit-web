import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { readDB } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();
  const userId = (session.user as any).id as string;
  const { planId } = req.body as { planId: string };
  const db = await readDB();
  const plan = db.plans.find(p => p.id === planId);
  const payload = {
    text: `Expert chat requested.\nUser: ${userId}\nPlan: ${planId}\nSummary: ${plan?.title || ''}`,
  };
  if (process.env.SLACK_WEBHOOK_URL) {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }
  res.status(200).json({ ok: true });
}
