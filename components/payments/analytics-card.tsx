import { Select } from '@mantine/core'
import AnalyticsChart from '../analytics/analytics-chart'

type Props = {}
export const AnalyticsCard = ({}: Props) => {
  return (
    <div className='flex flex-col gap-2 rounded-md border border-gray-100 p-3 bg-white'>
      <div className='flex items-center justify-between'>
        <div className='mb-2'>
          <p className='font-light text-gray-600 text-sm'>Payments</p>
          <p className='text-lg font-semibold'>$154,256.02</p>
        </div>
        <Select
          placeholder='select status'
          defaultValue={'Payments'}
          data={['Payments', 'Clients', 'Asset Values']}
        />
      </div>

      <div className='p-4'>
        <AnalyticsChart />
      </div>
    </div>
  )
}
