import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

interface AuthedRequest extends NextApiRequest {
  user?: any; // Add appropriate user type based on your app's needs
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Email and password must be strings.' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ message: error.message });
    }

    // Optionally store user information if needed
    req.user = data.user;

    return res.status(200).json({ user: data.user });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}