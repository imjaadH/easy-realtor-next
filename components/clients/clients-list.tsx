import {
  SquareArrowUpRight,
  MailPlus,
  User2,
  ArrowUpRight,
  MoveRight,
  PlusCircle,
  Plus,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { getDashboardClients } from '@/app/(dashboard)/clients/actions'
import { Session } from 'next-auth'

export const ClientList = async ({ session }: { session: Session }) => {
  if (session?.user) {
    const response = await getDashboardClients(session.user?.id!, 4)
    return (
      <div className='flex flex-col gap-2 rounded-md border border-gray-100 p-3 bg-white overflow-hidden'>
        <div className='flex justify-between items-center'>
          <p className='text-lg font-semibold'>Clients section</p>

          <Link href={'/clients'}>
            <Button variant={'secondary'}>
              Add new client
              <Plus />
            </Button>
          </Link>
        </div>

        <div className='flex flex-col gap-1 h-auto '>
          {!response.length && <div>No records found</div>}
          {response.map(client => (
            <div className='rounded-md bg-neutral-50 p-4'>
              <div className='flex justify-between w-full'>
                <div className=' flex flex-col'>
                  <p className='text-sm flex '>{client.name}</p>
                  {client.Contract.length ? (
                    <Link
                      href={`/assets/${client.Contract[0]?.property?.id}`}
                      title='View Property'
                    >
                      <div className='flex gap-1 items-center'>
                        <p className='text-xs text-slate-800'>
                          {client.Contract[0]?.property?.name ?? ''}
                        </p>
                        <SquareArrowUpRight
                          className='text-indigo-600'
                          size={13}
                        />
                      </div>{' '}
                    </Link>
                  ) : (
                    <p className='text-xs text-gray-500 font-light'>
                      No properties assigned..
                    </p>
                  )}

                  <p className='text-xs text-gray-500 font-light'>
                    {client.contact}
                  </p>
                </div>
                <Link href={`mailto:${client.email}`}>
                  <Button variant='outline' size='icon'>
                    <MailPlus size={18} />
                  </Button>
                </Link>
              </div>
            </div>
          ))}

          <Link
            href={'/clients'}
            className='flex gap-2 items-center text-indigo-600 text-sm'
          >
            <p>View all</p>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    )
  }

  return <div>please login to continue</div>
}
