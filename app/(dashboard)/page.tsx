import Image from 'next/image'
import { Download } from 'lucide-react'
import PropertyUnits from '@/components/home/property-units'
import { AnalyticsCard } from '@/components/payments/analytics-card'
import { ClientList } from '@/components/clients/clients-list'

export default function Home() {
  const icon = <Download />
  return (
    <div className='flex flex-col p-5 w-full mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-6 grid-rows-2 gap-2 mt-6 align-middle'>
        <div className='grid col-span-6 sm:col-span-4  '>
          {/* Analytics  */}
          <AnalyticsCard />
        </div>

        <div className='grid md:col-span-2 md:col-start-5 md:row-start-1 '>
          {/* Clients  */}
          <ClientList />
        </div>

        <div className='grid col-span-6 col-start-1 row-start-2'>
          {/* Clients  */}
          <PropertyUnits />
        </div>
      </div>
    </div>
  )
}
