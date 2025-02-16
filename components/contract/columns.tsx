'use client'

import { ColumnDef } from '@tanstack/react-table'
import { parseISO, format, formatDistanceToNowStrict } from 'date-fns'

import { Types } from '@/types'
import { contractStatusIcon } from '../common'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<
  Types.Contract & { property?: Types.Property }
>[] = [
  {
    accessorKey: 'starDate',
    header: 'Start Date',
    cell: ({ row }) => {
      return <div>{format(row.original.startDate, 'd LLL, yyyy')}</div>
    },
  },
  {
    accessorKey: 'endDate',
    header: 'Unit',
    cell: ({ row }) => {
      return <div>{row.original.property?.name}</div>
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-2'>
          {contractStatusIcon[row.original.status!]}

          {row.original.status}
        </div>
      )
    },
  },

  {
    accessorKey: 'startDate',
    header: 'Status(ending)',
    cell: ({ row }) => {
      return (
        <div className='flex'>
          {row.original.status === 'Active'
            ? formatDistanceToNowStrict(row.original.endDate!, {
                addSuffix: true,
                roundingMethod: 'floor',
              })
            : row.original.status}
        </div>
      )
    },
  },
]
