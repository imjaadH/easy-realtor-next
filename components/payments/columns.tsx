'use client'

import { ColumnDef } from '@tanstack/react-table'
import { parseISO, format, formatDistanceToNowStrict } from 'date-fns'

import { Types } from '@/types'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<
  Types.Payment & { contract: Types.Contract & { property: Types.Property } }
>[] = [
  {
    accessorKey: 'id',
    header: 'Property',
    cell: ({ row }) => {
      return <div>{row.original?.contract?.property?.name!}</div>
    },
  },

  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      return <div>${row.original.amount.toString()}</div>
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Payment Date',
    cell: ({ row }) => {
      return <div>{format(row.original.createdAt, 'd LLL, yyyy')}</div>
    },
  },
]
