'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'Sandbox' },
  { href: '/play', label: 'Play' },
  { href: '/learn', label: 'Learn' },
  { href: '/curriculum', label: 'Curriculum' },
  { href: '/cs-bridge', label: 'CS Bridge' },
] as const;

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-5 overflow-x-auto">
      {LINKS.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="text-xs whitespace-nowrap transition-colors"
            style={{ color: active ? '#c8956c' : '#555' }}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
