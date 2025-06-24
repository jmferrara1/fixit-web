import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: { bodyParser: false },
};

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Stripe webhook disabled
  res.status(200).json({ received: true });
}
