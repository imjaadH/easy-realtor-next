'use client'

import { ColumnDef } from '@tanstack/react-table'
import { parseISO, format, formatDistanceToNowStrict } from 'date-fns'

import { Types } from '@/types'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<
  Types.Contract & { property: Types.Property }
>[] = [
  {
    accessorKey: 'starDate',
    header: 'Start Date',
    cell: ({ row }) => {
      return <div>{format(row.original.startDate, 'd LLL, yyyy')}</div>
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    header: 'Unit',
    cell: ({ row }) => {
      return <div>{row.original.property.name}</div>
    },
  },

  {
    accessorKey: 'startDate',
    header: 'Status(ending)',
    cell: ({ row }) => {
      return (
        <div className='flex'>
          {formatDistanceToNowStrict(row.original.endDate!, {
            addSuffix: true,
            roundingMethod: 'floor',
          })}
        </div>
      )
    },
  },
]
