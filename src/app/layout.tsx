import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ErrorBoundary from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

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
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
} 