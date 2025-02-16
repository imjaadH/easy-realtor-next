import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { ArrowUpRight, MapPin, MapPinCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import PropertyMediaContainer from './property-media-card'
import { Session } from 'next-auth'
import { getAllAssets } from '@/app/(dashboard)/assets/actions'
import { cn } from '@/lib/utils'

interface Props {
  visibleItems?: number
  session: Session
}

const statusBgColors = {
  Active: 'bg-lime-700',
  Rented: 'bg-indigo-700',
  Sold: 'bg-gray-700',
  Maintenance: 'bg-orange-600',
}
const PropertyUnits = async ({ session, visibleItems = 5 }: Props) => {
  const response = await getAllAssets(session.user?.id!, 4)

  return (
    <div className=' flex flex-col gap-2 rounded-md border border-gray-100 p-3 bg-white shadow'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <p className='text-lg font-semibold'>My Units</p>
          <Link
            href={'/assets'}
            className='flex gap-2 items-center text-indigo-600 text-sm'
          >
            <p>View all</p>
            <ArrowUpRight size={15} />
          </Link>
        </div>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='light'>Light</SelectItem>
            <SelectItem value='dark'>Dark</SelectItem>
            <SelectItem value='system'>System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='grid grid-cols sm:grid-cols-2 md:grid-cols-4 gap-3 p-2'>
        {!response.length && <div>No property units found</div>}
        {response.map((item, index) => (
          <Card key={index}>
            <div className='w-full h-44 rounded-md flex relative'>
              <PropertyMediaContainer assetId={item.id} session={session} />
            </div>

            <CardContent className='p-2'>
              <p className='text-sm font-semibold'>{item.name}</p>

              <div className='flex gap-1 text-gray-500 '>
                <MapPinCheck size={15} />
                <p className='text-xs font-mono'>{item.location}</p>
              </div>

              <div className='flex items-center justify-between mt-4'>
                <div>
                  <p className='text-sm text-gray-800 font-semibold'>
                    ${item.propertyValue?.toString()}
                  </p>
                </div>

                <div
                  className={cn(
                    `rounded-full inline-flex items-center justify-center  text-xs text-white p-1 px-2`,
                    statusBgColors[item.status!],
                  )}
                >
                  {item.status}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default PropertyUnits
