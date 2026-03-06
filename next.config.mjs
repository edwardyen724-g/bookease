import { defineConfig } from 'next/config';

export default defineConfig({
  reactStrictMode: true,
  images: {
    domains: ['example.com'], // Replace with actual image domains
  },
  env: {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    GOOGLE_CALENDAR_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY,
  },
  experimental: {
    appDir: true,
  },
});