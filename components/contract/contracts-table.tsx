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
import {
  Check,
  MoreHorizontal,
  ReceiptIcon,
  ReceiptTextIcon,
  Trash2,
} from 'lucide-react'
import { Session } from 'next-auth'
import { useState } from 'react'
import UpdateContract from './update-contract'
import { useMutation } from '@tanstack/react-query'
import { updateContractStatus } from '@/app/(dashboard)/contracts/actions'
import { ContractStatus } from '@prisma/client'
import Loader from '../loader'

type Props = {
  contracts: Types.Contract[]
  session: Session
}
const ContractsTable = ({ contracts, session }: Props) => {
  const [formOpen, setFormOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Types.Contract | null>(null)
  const mutation = useMutation({
    mutationKey: ['update-contract'],
    mutationFn: async (values: {
      id: string
      propertyId: string
      status: ContractStatus
    }) => await updateContractStatus(values),
  })
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
      {mutation.isPending && <Loader />}
      <DataTable
        columns={[
          ...columns,
          {
            id: 'actions',
            cell: ({ row }) => {
              const contract = row.original

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
                      disabled={contract.status !== 'Active'}
                      className='cursor-pointer'
                      onSelect={() => {
                        setSelectedItem(contract)
                        setFormOpen(prev => !prev)
                      }}
                    >
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      disabled={contract.status !== 'Active'}
                      className='cursor-pointer'
                      onSelect={() => {
                        mutation.mutate({
                          id: contract.id,
                          propertyId: contract.propertyId,
                          status: ContractStatus.Completed,
                        })
                      }}
                    >
                      <Check />
                      Mark as Completed
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      disabled={contract.status !== 'Active'}
                      className='cursor-pointer text-red-700'
                      onSelect={() => {
                        mutation.mutate({
                          id: contract.id,
                          propertyId: contract.propertyId,
                          status: ContractStatus.Terminated,
                        })
                      }}
                    >
                      <Trash2 />
                      Terminate
                    </DropdownMenuItem>
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
