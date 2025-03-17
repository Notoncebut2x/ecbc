import type { Metadata, Viewport } from 'next';
import './globals.css';
import ErrorBoundary from '@/components/ErrorBoundary';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'East Coast ⚡ Bike Calendar',
  description: 'Community bike events and rides on the East Coast',
  keywords: 'bike, cycling, events, east coast, community, rides',
  openGraph: {
    title: 'East Coast ⚡ Bike Calendar',
    description: 'Community bike events and rides on the East Coast',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'East Coast ⚡ Bike Calendar',
    description: 'Community bike events and rides on the East Coast',
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/ecbc/globals.css" />
      </head>
      <body className="min-h-screen text-center font-['Courier_New'] antialiased">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
} 