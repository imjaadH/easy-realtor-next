'use client'

import { Types } from '@/types'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  Check,
  MoreHorizontal,
  ReceiptIcon,
  ReceiptTextIcon,
  Trash2,
} from 'lucide-react'
import { Session } from 'next-auth'
import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import { updateContractStatus } from '@/app/(dashboard)/contracts/actions'
import { ContractStatus } from '@prisma/client'
import Loader from '../loader'
import UpdatePayment from './update-payment'
import { DataTable } from './data-table'
import { columns } from './columns'

type Props = {
  payments: Types.Payment[]
  session: Session
}
const PaymentsTable = ({ payments, session }: Props) => {
  const [formOpen, setFormOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Types.Payment | null>(null)

  return (
    <div>
      <div className='flex justify-end'>
        <UpdatePayment
          session={session}
          defaultOpen={formOpen}
          defaultData={selectedItem!!}
          trigger={
            <Button onClick={() => setSelectedItem(null)}>
              Add Payment
              <ReceiptTextIcon />
            </Button>
          }
        />
      </div>

      <DataTable
        columns={[
          ...columns,
          {
            id: 'actions',
            cell: ({ row }) => {
              const payment = row.original

              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                      <span className='sr-only'>Open menu</span>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      className='cursor-pointer'
                      onSelect={() => {
                        setSelectedItem(payment)
                        setFormOpen(prev => !prev)
                      }}
                    >
                      Update
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            },
          },
        ]}
        data={payments ?? []}
      />
    </div>
  )
}

export default PaymentsTable
