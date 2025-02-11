'use client'

import { ColumnDef } from '@tanstack/react-table'
import { parseISO, format } from 'date-fns'

import { Types } from '@/types'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Types.Clients>[] = [
  {
    accessorKey: 'name',
    header: 'Full name',
  },
  {
    accessorKey: 'email',
    header: 'Email address',
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => {
      return <div>{format(row.original.createdAt, 'LLLL d, yyyy')}</div>
    },
  },
]
