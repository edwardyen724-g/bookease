import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
import { SupabaseProvider } from '../lib/supabaseProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BookEase',
  description: 'Effortless booking and rescheduling for local event planners and service providers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <SupabaseProvider>
          <Toaster />
          <main className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">Transform Your Booking Experience with BookEase</h1>
            {children}
          </main>
        </SupabaseProvider>
      </body>
    </html>
  );
}