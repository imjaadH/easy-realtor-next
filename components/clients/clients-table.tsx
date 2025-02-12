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
import { MoreHorizontal } from 'lucide-react'
import { Session } from 'next-auth'
import UpdateClient from './update-client'
import { useState } from 'react'

type Props = { clients: Types.Clients[]; session: Session }
const ClientsTable = ({ clients, session }: Props) => {
  const [selectedItem, setSelectedItem] = useState<Types.Clients | null>(null)
  const [formOpen, setFormOpen] = useState(false)

  return (
    <>
      <div className='flex justify-end'>
        <UpdateClient
          session={session}
          defaultOpen={formOpen}
          defaultData={selectedItem!!}
          children={
            <Button onClick={() => setSelectedItem(null)}>Add Client</Button>
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
                        setSelectedItem(client)
                        setFormOpen(prev => !prev)
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
        data={clients ?? []}
      />
    </>
  )
}

export default ClientsTable
