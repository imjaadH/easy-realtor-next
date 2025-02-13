'use client'

import { Types } from '@/types'
import { DataTable } from './data-table'
import { columns } from './columns'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, ReceiptIcon, ReceiptTextIcon } from 'lucide-react'
import { Session } from 'next-auth'
import { useState } from 'react'
import UpdateContract from './update-contract'

type Props = {
  contracts: Types.Contract[]
  session: Session
}
const ContractsTable = ({ contracts, session }: Props) => {
  const [formOpen, setFormOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Types.Contract | null>(null)

  return (
    <div>
      <div className='flex justify-end'>
        <UpdateContract
          session={session}
          defaultOpen={formOpen}
          defaultData={selectedItem!!}
          trigger={
            <Button onClick={() => setSelectedItem(null)}>
              Add Contract
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
              const client = row.original

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
                        // setSelectedItem(client)
                        // setFormOpen(prev => !prev)
                      }}
                    >
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            },
          },
        ]}
        data={contracts ?? []}
      />
    </div>
  )
}

export default ContractsTable
