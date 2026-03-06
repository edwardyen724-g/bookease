import { ReactNode } from 'react';
import './globals.css';
import { Metadata } from 'next';
import { SupabaseProvider } from '../context/SupabaseProvider';

export const metadata: Metadata = {
  title: "BookEase | Effortless booking tailored for wellness and fitness pros.",
  description: "Transform Your Booking Experience with BookEase",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          <main className="container">
            {children}
          </main>
        </SupabaseProvider>
      </body>
    </html>
  );
}