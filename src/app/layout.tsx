import React from 'react';
import { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'BookEase',
  description: 'Effortless booking and rescheduling for local event planners and service providers.',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
      </head>
      <body className="font-roboto bg-gray-100">
        <header className="bg-white shadow-md p-4">
          <h1 className="text-2xl font-bold">Transform Your Booking Experience with BookEase</h1>
        </header>
        <main className="container mx-auto py-6">
          {children}
        </main>
        <footer className="bg-white mt-6 p-4 shadow-md">
          <p className="text-center text-gray-600">© 2023 BookEase. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;