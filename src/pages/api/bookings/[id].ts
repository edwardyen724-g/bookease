import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@supabase/supabase-js';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { z } from 'zod';

interface AuthedRequest extends NextApiRequest {
  user: { id: string };
}

const firebaseAdminApp = initializeApp({
  credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS || '{}')),
});

const db = getFirestore(firebaseAdminApp);

const bookingSchema = z.object({
  id: z.string(),
  date: z.string().optional(),
  clientName: z.string().optional(),
  status: z.enum(['confirmed', 'canceled']).optional(),
});

const rateLimit = new Map<string, number>();

const rateLimitExceeded = (ip: string): boolean => {
  const currentCount = rateLimit.get(ip) || 0;
  const newCount = currentCount + 1;
  rateLimit.set(ip, newCount);
  return newCount > 5;
};

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  try {
    const { method, query, body } = req;
    const { id } = query;

    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid booking ID' });
    }

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (ip && rateLimitExceeded(ip as string)) {
      return res.status(429).json({ message: 'Too many requests' });
    }

    if (method === 'PUT') {
      const parsedBody = bookingSchema.parse(body);
      const bookingRef = db.collection('bookings').doc(parsedBody.id);

      await bookingRef.update({
        ...parsedBody,
      });

      return res.status(200).json({ message: 'Booking updated successfully' });
    } else if (method === 'DELETE') {
      const bookingRef = db.collection('bookings').doc(id);
      await bookingRef.delete();

      return res.status(204).end();
    } else {
      return res.setHeader('Allow', ['PUT', 'DELETE']).status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}