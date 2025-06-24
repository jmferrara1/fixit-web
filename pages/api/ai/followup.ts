import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { readDB, writeDB } from '../../../lib/db';

export const config = { api: { bodyParser: { sizeLimit: '5mb' } } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();
  const userId = (session.user as any).id as string;
  const { planId, message } = JSON.parse(req.body || '{}');
  const db = await readDB();
  const history = db.chatMessages.filter(m => m.planId === planId);
  history.push({
    id: Date.now().toString(),
    userId,
    role: 'user',
    content: message,
    planId,
    createdAt: new Date().toISOString(),
  });
  const messages = history.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));
  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ model: 'gpt-4', messages }),
  });
  const { choices } = await openaiRes.json();
  const reply = choices?.[0]?.message?.content || '';
  history.push({
    id: Date.now().toString(),
    userId,
    role: 'assistant',
    content: reply,
    planId,
    createdAt: new Date().toISOString(),
  });
  db.chatMessages = db.chatMessages.filter(m => m.planId !== planId).concat(history);
  await writeDB(db);
  res.status(200).json({ reply });
}
