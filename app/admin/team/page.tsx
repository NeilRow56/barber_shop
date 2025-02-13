import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { PlusCircleIcon } from 'lucide-react'
import Members from '@/components/members'
import { getTeam } from '@/lib/db/team'

export default async function Team() {
  const team = await getTeam(10)

  return (
    <section>
      <div>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-semibold tracking-tight'>Team</h2>

          <Button size='sm' className='h-7 gap-2' asChild>
            <Link href='/admin/team/new'>
              <PlusCircleIcon className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Add a member
              </span>
            </Link>
          </Button>
        </div>

        {team?.length > 0 ? (
          <Members team={team} />
        ) : (
          <div className='mt-4 text-sm text-muted-foreground'>
            No members found.
          </div>
        )}
      </div>
    </section>
  )
}
