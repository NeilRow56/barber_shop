import Link from 'next/link'

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from './theme-toggle'

export default function Header() {
  return (
    <header className='bg-background/20 fixed inset-x-0 top-0 z-50 py-6 backdrop-blur-sm'>
      <nav className='container flex items-center justify-between'>
        <div>
          <Link href='/' className='text-primary font-serif text-xl font-bold'>
            Blade & Fade
          </Link>
        </div>

        <ul className='text-muted-foreground flex items-center gap-6 text-sm font-light sm:gap-10'>
          <li>
            <Button asChild variant='ghost'>
              <Link href='/book'>Book now</Link>
            </Button>
          </li>
        </ul>

        <div className='flex items-center justify-between gap-6'>
          <ThemeToggle />

          <Button size='sm' variant='secondary' asChild>
            <Link href='/admin/dashboard'>Admin</Link>
          </Button>

          <SignedOut>
            <SignInButton>
              <Button size='sm'>Sign in</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}
