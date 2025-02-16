import { auth } from '@/lib/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HomeIcon } from 'lucide-react'
import PaymentsTable from '@/components/payments/payments-table'
import { getAllPayments } from './actions'

const PaymentsPage = async () => {
  const session = await auth()
  if (session?.user) {
    const response = await getAllPayments(session.user?.id!, 50)
    return (
      <div className='mx-auto flex flex-col gap-3  h-full p-4  '>
        <p className='text-2xl font-semibold'>Manage Payments</p>

        <section className=' mx-auto w-full overflow-auto'>
          <PaymentsTable session={session} payments={response} />
        </section>
      </div>
    )
  }
}

export default PaymentsPage
