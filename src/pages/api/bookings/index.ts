import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@supabase/supabase-js';
import { supabase } from '../../../lib/supabaseClient';  // Adjust the path as necessary

interface AuthedRequest extends NextApiRequest {
  user?: { id: string }; // Assuming user object contains id
}

const bookings: Map<string, number> = new Map(); // Simple rate limit: Map of user id to request count

async function handler(req: AuthedRequest, res: NextApiResponse) {
  const auth = getAuth(req.headers.cookie); // Extract user from request
  if (!auth.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    switch (req.method) {
      case 'GET':
        return await fetchBookings(req, res, auth.user.id);
      case 'POST':
        return await createBooking(req, res, auth.user.id);
      default:
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}

async function fetchBookings(req: AuthedRequest, res: NextApiResponse, userId: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    return res.status(500).json({ message: error.message });
  }

  return res.status(200).json(data);
}

async function createBooking(req: AuthedRequest, res: NextApiResponse, userId: string) {
  const { date, time, clientName } = req.body;

  if (!date || !time || !clientName) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const limit = bookings.get(userId) || 0;
  if (limit >= 5) { // Example rate limiting: max 5 requests per user
    return res.status(429).json({ message: 'Rate limit exceeded. Try again later.' });
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert([{ user_id: userId, date, time, client_name: clientName }]);
  
  bookings.set(userId, limit + 1); // Increment the request count for this user

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  return res.status(201).json(data);
}

export default handler;