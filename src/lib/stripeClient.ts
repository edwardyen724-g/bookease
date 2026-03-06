import { loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<ReturnType<typeof loadStripe>>;

const getStripe = (): Promise<ReturnType<typeof loadStripe>> => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);
  }
  return stripePromise;
};

export default getStripe;