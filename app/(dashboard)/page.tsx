import Image from 'next/image'
import { Download } from 'lucide-react'
import PropertyUnits from '@/components/home/property-units'
import { AnalyticsCard } from '@/components/payments/analytics-card'
import { ClientList } from '@/components/clients/clients-list'
import { auth } from '@/lib/auth'

export default async function Home() {
  const session = await auth()
  if (!session?.user) {
    return <div>please login first</div>
  }
  return (
    <div className='flex flex-col p-5 w-full mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-6 grid-rows-2 gap-2 mt-6 align-middle'>
        <div className='grid col-span-6 sm:col-span-4  '>
          {/* Analytics  */}
          <AnalyticsCard />
        </div>

        <div className='grid md:col-span-2 md:col-start-5 md:row-start-1 overflow-hidden'>
          {/* Clients  */}
          <ClientList session={session} />
        </div>

        <div className='grid col-span-6 col-start-1 row-start-2'>
          {/* Clients  */}
          <PropertyUnits session={session} />
        </div>
      </div>
    </div>
  )
}
