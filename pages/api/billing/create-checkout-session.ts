import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY || '');
  const checkout = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: process.env.PRICE_ID_PRO, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
    customer_email: session.user?.email || undefined,
  });
  res.status(200).json({ url: checkout.url });
}
