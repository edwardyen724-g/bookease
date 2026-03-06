import { NextApiRequest } from 'next';

export interface AuthedRequest extends NextApiRequest {
  user?: { id: string };
}
