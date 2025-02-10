import { Types } from '@/types'
import { format } from 'date-fns'
import { Button } from './ui/button'
import { Mail, Phone, SquareArrowOutUpRight, User, User2 } from 'lucide-react'
import Link from 'next/link'
import {
  CircleCheckBig,
  ContactRound,
  TrafficCone,
  WalletCards,
} from 'lucide-react'
import { ContractsList } from './contract/contract-list'
import React from 'react'

type Props = {
  data: Types.Property
  activeTenant?: Types.Clients
  children?: React.ReactNode
}
const statusIcon = {
  Active: <CircleCheckBig size={15} className='text-green-600' />,
  Maintenance: <TrafficCone size={15} className='text-orange-600' />,
  Rented: <ContactRound size={15} className='text-lime-600' />,
  Sold: <WalletCards size={15} className='text-slate-600' />,
}

export const PropertyDetailsCard = ({
  data,
  children,
  activeTenant,
}: Props) => {
  return (
    <div className='mt-4'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <p className='text-3xl font-semibold'>{data.name}</p>
          <p className='font-normal'>{data.location}</p>
        </div>

        <div className='flex flex-col items-end'>
          <div className='flex items-end gap-2'>
            <div
              className=' inline-flex items-center justify-center border rounded-full border-green-500 *:
        bg-neutral-100 text-neutral-800 px-2 text-sm
        '
            >
              {data.type}
            </div>
          </div>

          <p className='text-3xl font-semibold'>
            $ {data.propertyValue?.toString()!!}
          </p>
        </div>
      </div>

      <div className='flex items-start gap-4 flex-wrap my-10'>
        <div className='flex flex-col gap-1'>
          <p className='text-xs text-gray-600 '>TYPE</p>
          <p className='text-sm '>{data.type}</p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-xs text-gray-600 '>ADDED</p>
          <p className='text-sm '>{format(data.createdAt, 'dd-LL-yyyy')}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-xs text-gray-600 '>RENT CYCLE </p>
          <p className='text-sm '>{data.rentCycle} days</p>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-xs text-gray-600 '>STATUS</p>
          <span className='text-sm flex gap-1 items-center'>
            {statusIcon[data.status!!]}
            {data.status}
          </span>
        </div>

        {activeTenant ? (
          <div className='flex flex-col gap-1'>
            <p className='text-xs text-gray-600 '>TENANT</p>
            <Link
              href={`/clients/${activeTenant.id}`}
              className='flex items-center gap-1 hover:bg-gray-200 hover:rounded  px-2'
            >
              <p className='text-sm '>{activeTenant.name}</p>
              <SquareArrowOutUpRight size={14} className='text-indigo-700' />
            </Link>
          </div>
        ) : null}
      </div>

      <div className='grid grid-cols-6 gap-2'>
        <div className='col-span-2 rounded-md border p-5'>{children}</div>

        <div className='col-span-4 rounded-md border p-5'>
          <p className='font-semibold text-lg'>Contract History</p>

          <ContractsList assetId={data.id} />
        </div>
      </div>
    </div>
  )
}
