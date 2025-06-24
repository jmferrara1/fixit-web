import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { readDB } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();
  const userId = (session.user as any).id as string;
  const { planId } = req.query;
  const db = await readDB();
  const plan = db.plans.find(p => p.id === planId && p.userId === userId);
  if (!plan) return res.status(404).end();
  const steps = db.steps.filter(s => s.planId === planId);
  const parts = db.parts.filter(p => p.planId === planId);
  res.status(200).json({ plan, steps, parts });
}
