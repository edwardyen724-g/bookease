export interface AuthedRequest extends NextApiRequest {
  user?: { id: string };
}