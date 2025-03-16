import { CalendarEvent } from '@/types/calendar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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

export default function Layout({
  children,
  selectedFrequency = 'all',
  locations,
  selectedLocation,
  onLocationSelect,
}: LayoutProps) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen p-8">
      <div className="w-full max-w-2xl mx-auto text-lg font-['Courier_New']">
        <h1 className="text-center mb-4 text-[1.75rem] font-bold">
          <Link href="/" className="cursor-pointer hover:opacity-80">
            East Coast ⚡ Bike Calendar
          </Link>
        </h1>

        <div className="text-center space-y-2 mb-4">
          <div className="space-x-4">
            {NAVIGATION.map(({ href, label, value }) => (
              <Link
                key={href}
                href={href}
                className={`px-2 ${pathname === href ? 'font-bold underline' : ''}`}
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
                  className={`px-2 ${selectedLocation === location ? 'font-bold underline' : ''}`}
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
      </div>
    </main>
  );
} 