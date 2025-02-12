import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from '@/lib/constants'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import { cn } from '@/lib/utils'
import Providers from '@/components/providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif'
})

export const metadata: Metadata = {
  title: {
    template: `%s | Prostore`,
    default: APP_NAME
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL)
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <html
        lang='en'
        suppressHydrationWarning
        className='scroll-smooth antialiased'
      >
        <body
          className={cn(
            'flex min-h-screen flex-col font-sans antialiased',
            inter.variable,
            playfair.variable
          )}
        >
          <Providers>
            <main className='h-full grow'>{children}</main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
