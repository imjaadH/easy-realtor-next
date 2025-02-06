'use client'

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

import { MapPin, MapPinCheck } from 'lucide-react'
import Image from 'next/image'
interface Props {
  visibleItems?: number
}
const PropertyUnits: React.FC<Props> = ({ visibleItems = 5 }: Props) => {
  return (
    <div className=' flex flex-col gap-2 rounded-md border border-gray-100 p-3 bg-white shadow'>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-semibold'>My Units</p>

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
        <Card>
          <div className='w-full h-44 rounded-md flex relative'>
            <Image
              alt={'card-image'}
              src={
                'https://a0.muscache.com/im/pictures/miso/Hosting-22774851/original/7789a5cc-f7cb-4238-ad5d-f1d71e36365c.jpeg?im_w=720&im_format=avif'
              }
              fill
              className='rounded-md'
            />
          </div>

          <CardContent className='p-2'>
            <p className='text-sm font-semibold'>Tampak Siring, Indonesia</p>

            <div className='flex gap-1 text-gray-500 '>
              <MapPinCheck size={15} />
              <p className='text-xs font-mono'>23 Hagen street main road</p>
            </div>

            <div className='flex items-center justify-between mt-4'>
              <div>
                <p className='text-sm text-gray-800 font-semibold'>$49</p>
              </div>

              <div className='rounded-full bg-lime-700 inline-flex items-center justify-center  text-xs text-white p-1 px-2'>
                Active
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <div className='w-full h-44 rounded-md flex relative'>
            <Image
              alt={'card-image'}
              src={
                'https://a0.muscache.com/im/pictures/miso/Hosting-22774851/original/7789a5cc-f7cb-4238-ad5d-f1d71e36365c.jpeg?im_w=720&im_format=avif'
              }
              fill
              className='rounded-md'
            />
          </div>

          <CardContent className='p-2'>
            <p className='text-sm font-semibold'>Tampak Siring, Indonesia</p>

            <div className='flex gap-1 text-gray-500 '>
              <MapPinCheck size={15} />
              <p className='text-xs font-mono'>23 Hagen street main road</p>
            </div>

            <div className='flex items-center justify-between mt-4'>
              <div>
                <p className='text-sm text-gray-800 font-semibold'>$49</p>
              </div>

              <div className='rounded-full bg-lime-700 inline-flex items-center justify-center  text-xs text-white p-1 px-2'>
                Active
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <div className='w-full h-44 rounded-md flex relative'>
            <Image
              alt={'card-image'}
              src={
                'https://a0.muscache.com/im/pictures/miso/Hosting-22774851/original/7789a5cc-f7cb-4238-ad5d-f1d71e36365c.jpeg?im_w=720&im_format=avif'
              }
              fill
              className='rounded-md'
            />
          </div>

          <CardContent className='p-2'>
            <p className='text-sm font-semibold'>Tampak Siring, Indonesia</p>

            <div className='flex gap-1 text-gray-500 '>
              <MapPinCheck size={15} />
              <p className='text-xs font-mono'>23 Hagen street main road</p>
            </div>

            <div className='flex items-center justify-between mt-4'>
              <div>
                <p className='text-sm text-gray-800 font-semibold'>$49</p>
              </div>

              <div className='rounded-full bg-lime-700 inline-flex items-center justify-center  text-xs text-white p-1 px-2'>
                Active
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <div className='w-full h-44 rounded-md flex relative'>
            <Image
              alt={'card-image'}
              src={
                'https://a0.muscache.com/im/pictures/miso/Hosting-22774851/original/7789a5cc-f7cb-4238-ad5d-f1d71e36365c.jpeg?im_w=720&im_format=avif'
              }
              fill
              className='rounded-md'
            />
          </div>

          <CardContent className='p-2'>
            <p className='text-sm font-semibold'>Tampak Siring, Indonesia</p>

            <div className='flex gap-1 text-gray-500 '>
              <MapPinCheck size={15} />
              <p className='text-xs font-mono'>23 Hagen street main road</p>
            </div>

            <div className='flex items-center justify-between mt-4'>
              <div>
                <p className='text-sm text-gray-800 font-semibold'>$49</p>
              </div>

              <div className='rounded-full bg-lime-700 inline-flex items-center justify-center  text-xs text-white p-1 px-2'>
                Active
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PropertyUnits
