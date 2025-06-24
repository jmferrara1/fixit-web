import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { readDB, writeDB } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !(session.user as any).isAdmin) return res.status(401).end();
  const db = await readDB();
  if (req.method === 'GET') {
    res.status(200).json(db.partners || []);
  } else if (req.method === 'POST') {
    const { name, apiKey } = req.body;
    const id = Date.now().toString();
    db.partners = db.partners || [];
    db.partners.push({ id, name, apiKey });
    await writeDB(db);
    res.status(200).json({ id, name, apiKey });
  } else {
    res.status(405).end();
  }
}
