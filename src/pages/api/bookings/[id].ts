import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';
import { Booking } from '../../../types/booking'; // Assuming a Booking type is defined for TypeScript

interface AuthedRequest extends NextApiRequest {
  user?: { id: string };
}

const bookingsMap = new Map<string, { count: number; timestamp: number }>();

const rateLimit = (id: string) => {
  const currentTime = Date.now();
  const { count = 0, timestamp = currentTime } = bookingsMap.get(id) || {};

  if (count >= 5 && currentTime - timestamp < 60000) {
    return false; // Rate limit exceeded
  }

  if (currentTime - timestamp >= 60000) {
    bookingsMap.set(id, { count: 1, timestamp: currentTime });
  } else {
    bookingsMap.set(id, { count: count + 1, timestamp });
  }

  return true; // Rate limit not exceeded
};

const handler = async (req: AuthedRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid booking ID' });
  }

  if (!rateLimit(id)) {
    return res.status(429).json({ message: 'Too many requests' });
  }

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from<Booking>('bookings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return res.status(404).json({ message: error.message });
      }

      return res.status(200).json(data);
    }

    if (req.method === 'PUT') {
      const { body } = req;
      const { error } = await supabase
        .from<Booking>('bookings')
        .update(body)
        .eq('id', id);

      if (error) {
        return res.status(500).json({ message: error.message });
      }

      return res.status(200).json({ message: 'Booking updated successfully' });
    }

    return res.setHeader('Allow', ['GET', 'PUT']).status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
};

export default handler;