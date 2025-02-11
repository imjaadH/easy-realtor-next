import { Loader2 } from 'lucide-react'

const Loader = () => (
  <div className='flex items-center gap-2 text-gray-600 text-xs'>
    Please wait..
    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
  </div>
)

export default Loader
