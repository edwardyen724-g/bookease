import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";

interface AuthedRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

export default async function signup(
  req: AuthedRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}