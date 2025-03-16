const FREQUENCIES = [
  { href: '/', label: 'All' },
  { href: '/annual', label: 'Annual' },
  { href: '/monthly', label: 'Monthly' },
  { href: '/weekly', label: 'Weekly' },
] as const;

interface NavigationProps {
  currentPath: string;
}

export default function Navigation({ currentPath }: NavigationProps) {
  return (
    <div className="text-center space-y-2 mb-4">
      <div className="space-x-4">
        {FREQUENCIES.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className={`px-2 ${currentPath === href ? 'font-bold underline' : ''}`}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
} 