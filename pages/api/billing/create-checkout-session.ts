import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Stripe integration disabled for minimal deploy
  res.status(200).json({ url: null });
}
