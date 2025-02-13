import { getAssetContracts } from '@/app/(dashboard)/contracts/actions'
import { format, differenceInDays, formatDistance } from 'date-fns'
import { CalendarCheck, CircleCheckBig, CircleX, Contact } from 'lucide-react'

type Props = {
  assetId: string
}

const statusIcon = {
  Active: <CircleCheckBig size={17} className='text-purple-600' />,
  Completed: <CalendarCheck size={17} className='text-green-600' />,
  Terminated: <CircleX size={17} className='text-red-600' />,
}

export const ContractsList = async ({ assetId }: Props) => {
  const contracts = await getAssetContracts(assetId)
  if (!contracts.length)
    return <p className='text-gray-600 text-sm mt-4'>no contracts found</p>
  return (
    <>
      {contracts.map((item, _) => (
        <div
          className='flex flex-col p-3 rounded-md border bg-neutral-100 mt-2'
          key={item.id}
        >
          <div className='flex gap-2'>
            <div>
              <div className='rounded-full bg-white inline-flex relative p-1 border '>
                {statusIcon[item?.status as keyof typeof statusIcon]}
              </div>
            </div>

            <div className='flex flex-col'>
              <div className='flex gap-2 items-center text-sm font-semibold'>
                {item?.client?.name}

                <p className='text-gray-500 text-xs font-normal'>
                  {format(item.createdAt, 'dd LLLL yyyy')}
                </p>
              </div>

              <p className='text-xs font-semibold'>
                Duration{' '}
                {formatDistance(item.startDate!, item.endDate!, {
                  addSuffix: false,
                })}{' '}
                | $ {item.costPerMonth?.toString()}
              </p>

              <p className='text-sm text-gray-700 mt-2'> {item.description} </p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
