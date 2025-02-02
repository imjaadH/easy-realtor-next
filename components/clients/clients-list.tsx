import { Button, List, ActionIcon } from '@mantine/core'
import {
  SquareArrowUpRight,
  MailPlus,
  User2,
  ArrowUpRight,
  MoveRight,
} from 'lucide-react'
import Link from 'next/link'

type Props = {}
export const ClientList = ({}: Props) => {
  return (
    <div className='flex flex-col gap-2 rounded-md border border-gray-100 p-3 bg-white h-full overflow-y-auto '>
      <div className='flex justify-between'>
        <p className='text-lg font-semibold'>Clients section</p>

        <Link
          href={'#'}
          className='flex gap-2 items-center text-indigo-600 text-sm'
        >
          <p>View all</p>
          <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className='flex flex-col gap-1 h-full oveflow-auto'>
        <div className='rounded-md bg-neutral-50 p-4'>
          <div className='flex justify-between w-full'>
            <div className=' flex flex-col'>
              <p className='text-sm'>Jeniffer Blake</p>
              <p className='text-xs text-gray-500 font-light'>
                No properties assigned..
              </p>
              <p className='text-xs text-gray-500 font-light'>+61 7484418</p>
            </div>

            <ActionIcon
              variant='light'
              size={'lg'}
              aria-label='Email'
              title='Send Email'
            >
              <MailPlus size={18} />
            </ActionIcon>
          </div>
        </div>
        <div className='rounded-md bg-neutral-50 p-4'>
          <div className='flex justify-between w-full'>
            <div className=' flex flex-col'>
              <p className='text-sm'>Mk Edward</p>
              <Link href={'#'} title='View Property'>
                <div className='flex gap-1 items-center'>
                  <p className='text-xs text-slate-800'>Santa Monica</p>
                  <SquareArrowUpRight className='text-indigo-600' size={13} />
                </div>{' '}
              </Link>
              <p className='text-xs text-gray-500 font-light'>+61 7484418</p>
            </div>

            <ActionIcon variant='light' size={'lg'} aria-label='Email'>
              <MailPlus size={18} />
            </ActionIcon>
          </div>
        </div>
        <div className='rounded-md bg-neutral-50 p-4'>
          <div className='flex justify-between w-full'>
            <div className=' flex flex-col'>
              <p className='text-sm'>Mk Edward</p>
              <Link href={'#'} title='View Property'>
                <div className='flex gap-1 items-center'>
                  <p className='text-xs text-slate-800'>Santa Monica</p>
                  <SquareArrowUpRight className='text-indigo-600' size={13} />
                </div>{' '}
              </Link>
              <p className='text-xs text-gray-500 font-light'>+61 7484418</p>
            </div>

            <ActionIcon variant='light' size={'lg'} aria-label='Email'>
              <MailPlus size={18} />
            </ActionIcon>
          </div>
        </div>
        <div className='rounded-md bg-neutral-50 p-4'>
          <div className='flex justify-between w-full'>
            <div className=' flex flex-col'>
              <p className='text-sm'>Mk Edward</p>
              <Link href={'#'} title='View Property'>
                <div className='flex gap-1 items-center'>
                  <p className='text-xs text-slate-800'>Santa Monica</p>
                  <SquareArrowUpRight className='text-indigo-600' size={13} />
                </div>{' '}
              </Link>
              <p className='text-xs text-gray-500 font-light'>+61 7484418</p>
            </div>

            <ActionIcon variant='light' size={'lg'} aria-label='Email'>
              <MailPlus size={18} />
            </ActionIcon>
          </div>
        </div>
        <div className='rounded-md bg-neutral-50 p-4'>
          <div className='flex justify-between w-full'>
            <div className=' flex flex-col'>
              <p className='text-sm'>Mk Edward</p>
              <Link href={'#'} title='View Property'>
                <div className='flex gap-1 items-center'>
                  <p className='text-xs text-slate-800'>Santa Monica</p>
                  <SquareArrowUpRight className='text-indigo-600' size={13} />
                </div>{' '}
              </Link>
              <p className='text-xs text-gray-500 font-light'>+61 7484418</p>
            </div>

            <ActionIcon variant='light' size={'lg'} aria-label='Email'>
              <MailPlus size={18} />
            </ActionIcon>
          </div>
        </div>
      </div>
    </div>
  )
}
