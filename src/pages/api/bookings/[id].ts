import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

interface AuthedRequest extends NextApiRequest {
  user?: { id: string };
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const bookingsMap = new Map<string, number>();
const RATE_LIMIT = 5; // max requests per minute

const isRateLimited = (key: string): boolean => {
  const currentTimestamp = Date.now();
  const requestCount = bookingsMap.get(key) || 0;

  if (requestCount >= RATE_LIMIT) {
    return true;
  }

  bookingsMap.set(key, requestCount + 1);
  setTimeout(() => bookingsMap.set(key, requestCount), 60000); // reset count after a minute
  
  return false;
};

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  const { method, query } = req;
  const bookingId = query.id as string;

  if (!bookingId) {
    return res.status(400).json({ error: 'Booking ID is required.' });
  }

  try {
    if (isRateLimited(bookingId)) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    switch (method) {
      case 'GET':
        const { data: booking, error: fetchError } = await supabase
          .from('bookings')
          .select('*')
          .eq('id', bookingId)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        return res.status(200).json(booking);
        
      case 'PUT':
        const { body } = req;
        const { data: updatedBooking, error: updateError } = await supabase
          .from('bookings')
          .update(body)
          .eq('id', bookingId);

        if (updateError) {
          throw updateError;
        }

        return res.status(200).json(updatedBooking);

      default:
        return res.setHeader('Allow', ['GET', 'PUT']).status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
}