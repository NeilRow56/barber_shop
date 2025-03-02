'use client'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'

import Image from 'next/image'

const NotFoundPage = () => {
  return (
    <div className='flex min-h-screen min-w-[600px] flex-col items-center justify-center'>
      <Image
        src='/not-found-1024x1024.png'
        width={96}
        height={96}
        alt={`${APP_NAME} logo`}
        priority={true}
      />
      <div className='w-1/3 rounded-lg p-6 text-center shadow-md'>
        <h1 className='mb-4 text-3xl font-bold'>Not Found</h1>
        <p className='text-destructive'>Could not find requested page</p>
        <Button
          variant='outline'
          className='ml-2 mt-4'
          onClick={() => (window.location.href = '/')}
        >
          Back To Home
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
