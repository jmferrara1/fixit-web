import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { readDB } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !(session.user as any).isAdmin) return res.status(401).end();
  const db = await readDB();
  res.status(200).json({ chats: db.chatMessages.length, plans: db.plans.length });
}
