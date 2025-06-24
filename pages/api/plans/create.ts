import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { readDB, writeDB } from '../../../lib/db';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();
  const userId = (session.user as any).id as string;
  const db = await readDB();
  const planId = crypto.randomUUID();
  db.plans.push({ id: planId, userId, createdAt: new Date().toISOString() });
  await writeDB(db);
  res.status(200).json({ planId });
}
