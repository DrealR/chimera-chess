'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'Sandbox' },
  { href: '/play', label: 'Play' },
  { href: '/learn', label: 'Learn' },
  { href: '/curriculum', label: 'Curriculum' },
] as const;

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1">
      {LINKS.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="px-3 py-1.5 rounded text-xs font-medium transition-colors"
            style={
              active
                ? { backgroundColor: 'rgba(200,149,108,0.15)', color: '#c8956c' }
                : { color: '#666' }
            }
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
