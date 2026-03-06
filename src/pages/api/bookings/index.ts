import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

interface AuthedRequest extends NextApiRequest {
  user?: { id: string; email: string };
}

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ANON_KEY!);

const bookingsMap = new Map<string, number>();

const rateLimit = (key: string) => {
  const currentTime = Date.now();
  const limit = 5; // Maximum requests per minute
  const windowTime = 60 * 1000; // 1 minute

  if (bookingsMap.has(key)) {
    const [lastRequestTime, count] = bookingsMap.get(key)!;
    if (currentTime - lastRequestTime < windowTime) {
      if (count >= limit) {
        return false; // Rate limit exceeded
      }
      bookingsMap.set(key, [lastRequestTime, count + 1]);
    } else {
      bookingsMap.set(key, [currentTime, 1]);
    }
  } else {
    bookingsMap.set(key, [currentTime, 1]);
  }
  return true;
};

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const userId = req.user?.id; // Assuming user is authenticated and user ID is passed

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const rateLimitKey = `booking-${userId}`;

    if (!rateLimit(rateLimitKey)) {
      return res.status(429).json({ error: 'Too Many Requests' });
    }

    const { eventName, eventDate, clientInfo } = req.body;

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            user_id: userId,
            event_name: eventName,
            event_date: eventDate,
            client_info: clientInfo,
          },
        ]);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(201).json(data);
    } catch (err) {
      return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}