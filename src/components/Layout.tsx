import { CalendarEvent } from '@/types/calendar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { Metadata, Viewport } from 'next';
import ErrorBoundary from '@/components/ErrorBoundary';

interface LayoutProps {
  children: React.ReactNode;
  selectedFrequency?: CalendarEvent['frequency'] | 'all';
  locations: string[];
  selectedLocation: string | null;
  onLocationSelect: (location: string | null) => void;
}

const NAVIGATION = [
  { href: '/', label: 'All', value: 'all' },
  { href: '/annual', label: 'Annual', value: 'annual' },
  { href: '/monthly', label: 'Monthly', value: 'monthly' },
  { href: '/weekly', label: 'Weekly', value: 'weekly' },
] as const;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'East Coast ⚡ Bike Calendar',
  description: 'Community bike events and rides on the East Coast',
  keywords: 'bike, cycling, events, east coast, community, rides, group rides, bike events, baltimore, maryland, virginia, washington d.c., d.c.',
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

export default function Layout({
  children,
  selectedFrequency = 'all',
  locations,
  selectedLocation,
  onLocationSelect,
}: LayoutProps) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="min-h-screen font-['Courier_New'] antialiased">
        <main className="min-h-screen p-8">
          <div className="w-full max-w-2xl mx-auto text-lg font-['Courier_New']">
            <h1 className="text-center mb-4 text-[1.75rem] font-bold">
              <Link href="/" className="rotate-hover">
                East Coast ⚡ Bike Calendar
              </Link>
            </h1>

            <div className="text-center space-y-2 mb-4">
              <div className="space-x-4">
                {NAVIGATION.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`rotate-hover px-2 ${pathname === href ? 'font-bold underline' : ''}`}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {locations.length > 0 && (
                <div className="space-x-4">
                  {locations.map(location => (
                    <button
                      key={location}
                      onClick={() => onLocationSelect(location === selectedLocation ? null : location)}
                      className={`rotate-hover px-2 ${selectedLocation === location ? 'font-bold underline' : ''}`}
                    >
                      {location.split(',')[0]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <pre className="text-center mb-8 select-none text-[0.5rem] leading-[0.5rem]">
                {'   \\  /   \\  /   \\  /   \\  /   \\  /  \n'}
                {'---///----///----///----///----///---\n'}
                {'  /  \\   /  \\   /  \\   /  \\   /  \\  '}
              </pre>
            </div>

            {children}

            <footer className="mt-16 text-center">
              <a 
                href="https://buymeacoffee.com/notoncebut2x" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rotate-hover inline-block"
              >
                <pre className="text-[0.6rem] leading-[0.6rem] select-none">
                  {'         {\n'}
                  {'      {   }\n'}
                  {'       }_{ __{\n'}
                  {'    .-{   }   }-.\n'}
                  {'   (   }     {   )\n'}
                  {'   |`-.._____..-\'|\n'}
                  {'   |             ;--.\n'}
                  {'   |   Buy me   (__  \\\n'}
                  {'   |      a      | )  )\n'}
                  {'   |   coffee    |/  /\n'}
                  {'   |             /  /\n'}
                  {'   \\             y\'\n'}
                  {'    `-.._____..-\''}
                </pre>
              </a>
            </footer>
          </div>
        </main>
      </body>
    </html>
  );
} 