import {
  CircleCheckBig,
  ContactRound,
  TrafficCone,
  WalletCards,
  CalendarCheck,
  CircleX,
} from 'lucide-react'

export const assetStatusIcon = {
  Active: <CircleCheckBig size={15} className='text-green-600' />,
  Maintenance: <TrafficCone size={15} className='text-orange-600' />,
  Rented: <ContactRound size={15} className='text-lime-600' />,
  Sold: <WalletCards size={15} className='text-slate-600' />,
}

export const contractStatusIcon = {
  Active: <CircleCheckBig size={17} className='text-purple-600' />,
  Completed: <CalendarCheck size={17} className='text-green-600' />,
  Terminated: <CircleX size={17} className='text-red-600' />,
}
