import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

interface AuthedRequest extends NextApiRequest {
  user?: { id: string };
}

const bookings: Record<string, any[]> = new Map();

const createBooking = async (req: AuthedRequest, res: NextApiResponse) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { clientName, eventDate, details } = req.body;
    if (!clientName || !eventDate || !details) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const bookingId = uuidv4();
    const { data, error } = await supabase
      .from('bookings')
      .insert([{ id: bookingId, userId: user.id, clientName, eventDate, details }]);

    if (error) {
      return res.status(500).json({ message: err instanceof Error ? err.message : String(error) });
    }

    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
};

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await createBooking(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}