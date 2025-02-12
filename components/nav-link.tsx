'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export default function NavLink({
  href,
  children,
  ...props
}: {
  href: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      {...props}
      className={cn(
        'text-muted-foreground inline-flex items-center gap-2 transition-colors hover:text-foreground',
        isActive && 'font-semibold text-foreground'
      )}
    >
      {children}
    </Link>
  )
}
