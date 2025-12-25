import Link from 'next/link'

const navItems = [
  { href: '/', label: 'home' },
  { href: '/blog', label: 'blog' },
  { href: '/series', label: 'series' },
  { href: '/til', label: 'til' },
]

export function Navbar() {
  return (
    <nav className="mb-10 border-b border-dashed border-neutral-200 pb-3 text-[12px] uppercase tracking-[0.35em] text-neutral-500 dark:border-neutral-800 dark:text-neutral-500">
      <ul className="flex flex-wrap gap-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="transition hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
