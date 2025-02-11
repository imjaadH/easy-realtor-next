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
import Link from 'next/link'

type Props = { clients: Types.Clients[] }
const ClientsTable = ({ clients }: Props) => {
  return (
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
                  <Link href={`/dashboard/vehicles/${client.id}/update`}>
                    <DropdownMenuItem className='cursor-pointer'>
                      Update
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className='text-red-600 cursor-pointer hover:text-red-950'
                    onClick={() => null}
                  >
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          },
        },
      ]}
      data={clients ?? []}
    />
  )
}

export default ClientsTable
