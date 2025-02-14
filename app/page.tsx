import Hero from '@/components/hero'
import { Button } from '@/components/ui/button'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const { userId } = await auth()
  return (
    <section className='min-h-80vh'>
      <Hero />
    </section>
  )
}
