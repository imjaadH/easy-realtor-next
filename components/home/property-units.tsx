'use client'
import { Card, Select, Image, Badge } from '@mantine/core'
import { MapPin } from 'lucide-react'
interface Props {
  visibleItems?: number
}
const PropertyUnits: React.FC<Props> = ({ visibleItems = 5 }: Props) => {
  return (
    <div className=' flex flex-col gap-2 rounded-md border border-gray-100 p-3 bg-white shadow'>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-semibold'>My Units</p>

        <Select
          placeholder='select status'
          data={['Active', 'Rented', 'Maintenance', 'Sold']}
        />
      </div>

      <div className='grid grid-cols sm:grid-cols-2 md:grid-cols-6 gap-3 p-2'>
        <Card shadow='sm' padding='sm' radius='md'>
          <Card.Section>
            <Image
              src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
              height={160}
              alt='Norway'
            />
          </Card.Section>
          <div>
            <p className='text-indigo-900 font-bold mt-2'>$750,200</p>
            <p className='text-slate-950 font-semibold text-sm'>
              Santa Monica Manhatton
            </p>
          </div>

          <div className='flex items-center gap-1 mt-2'>
            <MapPin className='text-indigo-700' size={13} />
            <p className='font-light text-gray-600 text-xs'>
              Sao Palo Malaysia
            </p>
          </div>
          <div className='flex justify-between items-center'>
            <Badge variant='filled' color='blue' className='mt-2'>
              Active
            </Badge>

            <p className='font-light text-gray-600 text-xs'>29 Aug 2024</p>
          </div>
        </Card>
        <Card shadow='sm' padding='sm' radius='md'>
          <Card.Section>
            <Image
              src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
              height={160}
              alt='Norway'
            />
          </Card.Section>
          <div>
            <p className='text-indigo-900 font-bold mt-2'>$750,200</p>
            <p className='text-slate-950 font-semibold text-sm'>
              Santa Monica Manhatton
            </p>
          </div>

          <div className='flex items-center gap-1 mt-2'>
            <MapPin className='text-indigo-700' size={13} />
            <p className='font-light text-gray-600 text-xs'>
              Sao Palo Malaysia
            </p>
          </div>
          <div className='flex justify-between items-center'>
            <Badge variant='filled' color='blue' className='mt-2'>
              Active
            </Badge>

            <p className='font-light text-gray-600 text-xs'>29 Aug 2024</p>
          </div>
        </Card>
        <Card shadow='sm' padding='sm' radius='md'>
          <Card.Section>
            <Image
              src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
              height={160}
              alt='Norway'
            />
          </Card.Section>
          <div>
            <p className='text-indigo-900 font-bold mt-2'>$750,200</p>
            <p className='text-slate-950 font-semibold text-sm'>
              Santa Monica Manhatton
            </p>
          </div>

          <div className='flex items-center gap-1 mt-2'>
            <MapPin className='text-indigo-700' size={13} />
            <p className='font-light text-gray-600 text-xs'>
              Sao Palo Malaysia
            </p>
          </div>
          <div className='flex justify-between items-center'>
            <Badge variant='filled' color='blue' className='mt-2'>
              Active
            </Badge>

            <p className='font-light text-gray-600 text-xs'>29 Aug 2024</p>
          </div>
        </Card>
        <Card shadow='sm' padding='sm' radius='md'>
          <Card.Section>
            <Image
              src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
              height={160}
              alt='Norway'
            />
          </Card.Section>
          <div>
            <p className='text-indigo-900 font-bold mt-2'>$750,200</p>
            <p className='text-slate-950 font-semibold text-sm'>
              Santa Monica Manhatton
            </p>
          </div>

          <div className='flex items-center gap-1 mt-2'>
            <MapPin className='text-indigo-700' size={13} />
            <p className='font-light text-gray-600 text-xs'>
              Sao Palo Malaysia
            </p>
          </div>
          <div className='flex justify-between items-center'>
            <Badge variant='filled' color='blue' className='mt-2'>
              Active
            </Badge>

            <p className='font-light text-gray-600 text-xs'>29 Aug 2024</p>
          </div>
        </Card>
        <Card shadow='sm' padding='sm' radius='md'>
          <Card.Section>
            <Image
              src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
              height={160}
              alt='Norway'
            />
          </Card.Section>
          <div>
            <p className='text-indigo-900 font-bold mt-2'>$750,200</p>
            <p className='text-slate-950 font-semibold text-sm'>
              Santa Monica Manhatton
            </p>
          </div>

          <div className='flex items-center gap-1 mt-2'>
            <MapPin className='text-indigo-700' size={13} />
            <p className='font-light text-gray-600 text-xs'>
              Sao Palo Malaysia
            </p>
          </div>
          <div className='flex justify-between items-center'>
            <Badge variant='filled' color='blue' className='mt-2'>
              Active
            </Badge>

            <p className='font-light text-gray-600 text-xs'>29 Aug 2024</p>
          </div>
        </Card>

        <Card shadow='sm' padding='sm' radius='md'>
          <Card.Section>
            <Image
              src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
              height={160}
              alt='Norway'
            />
          </Card.Section>
          <div>
            <p className='text-indigo-900 font-bold mt-2'>$750,200</p>
            <p className='text-slate-950 font-semibold text-sm'>
              Santa Monica Manhatton
            </p>
          </div>

          <div className='flex items-center gap-1 mt-2'>
            <MapPin className='text-indigo-700' size={13} />
            <p className='font-light text-gray-600 text-xs'>
              Sao Palo Malaysia
            </p>
          </div>
          <div className='flex justify-between items-center'>
            <Badge variant='filled' color='blue' className='mt-2'>
              Active
            </Badge>

            <p className='font-light text-gray-600 text-xs'>29 Aug 2024</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default PropertyUnits
