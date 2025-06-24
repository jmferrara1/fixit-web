import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { readDB, writeDB } from '../../../lib/db';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY || '');
  const sig = req.headers['stripe-signature'] as string;
  const buf = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET || '');
  } catch (err) {
    return res.status(400).send(`Webhook Error`);
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const email = session.customer_details?.email;
    if (email) {
      const db = await readDB();
      const user = db.users.find(u => u.email === email);
      if (user) {
        (user as any).isPro = true;
        await writeDB(db);
      }
    }
  }
  res.json({ received: true });
}
