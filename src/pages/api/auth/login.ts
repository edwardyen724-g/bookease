import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';

interface AuthedRequest extends NextApiRequest {
  user?: any; // Add appropriate user type based on your app's needs
}

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ message: error.message });
    }

    req.user = data.user;

    return res.status(200).json({ user: data.user });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}