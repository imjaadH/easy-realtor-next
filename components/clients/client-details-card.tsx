import { Types } from '@/types'
import { Mail, Pencil, Phone, User2, UserPen } from 'lucide-react'
import Link from 'next/link'

interface Props {
  client?: Types.Clients
  allowEdit?: boolean
}
const ClientDetailsCard = ({ client, allowEdit }: Props) => {
  if (!client)
    return (
      <div>
        <p className='font-semibold text-lg'>Client Details</p>
        <p className='text-gray-600 text-sm mt-4'>no active tenant found</p>
      </div>
    )
  return (
    <div className='w-full'>
      <div className='flex items-center justify-between w-full'>
        <p className='font-semibold text-lg'>Client Details</p>

        {allowEdit ? (
          <Link
            href={`/clients/update/${client.id}`}
            className='rounded-md border bg-neutral-50 p-2'
          >
            <Pencil size={15} className='text-indigo-800' />
          </Link>
        ) : null}
      </div>

      <div className='flex flex-col space-y-1 mt-4'>
        <div className='flex gap-2 items-center'>
          <User2 size={14} className='text-slate-800' />
          <p className='text-sm'>{client.name}</p>
        </div>

        <div className='flex gap-2 items-center'>
          <Phone size={14} className='text-slate-800' />
          <p className='text-sm'>{client.contact}</p>
        </div>

        <div className='flex gap-2 items-center'>
          <Mail size={14} className='text-slate-800' />
          <Link href={`mailto:${client.email}`}>
            <p className='text-sm'>{client.email}</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ClientDetailsCard
