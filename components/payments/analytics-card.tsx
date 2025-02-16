import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import AnalyticsChart from '../analytics/analytics-chart'

type Props = {}
export const AnalyticsCard = ({}: Props) => {
  return (
    <div className='flex flex-col gap-2 rounded-md border border-gray-100 p-3 bg-white'>
      <div className='flex items-center justify-between'>
        <div className='mb-2'>
          <p className='text-sm font-semibold'>Clients</p>
          <p className='text-lg font-semibold'>$154,256.02</p>
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

      <div className='p-4'>
        <AnalyticsChart />
      </div>
    </div>
  )
}
