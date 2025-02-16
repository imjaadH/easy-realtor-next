import { auth } from '@/lib/auth'

import { getClients } from './actions'
import ClientsTable from '@/components/clients/clients-table'

type Props = {}
const ClientsPage = async ({}: Props) => {
  const session = await auth()
  if (session?.user) {
    const response = await getClients(session.user?.id!!, 10)
    return (
      <div className='mx-auto flex flex-col gap-3 h-full p-4 '>
        <p className='text-2xl font-semibold'>Manage Clients</p>

        <section className='mt-6 mx-auto w-full '>
          <ClientsTable clients={response} session={session} />
        </section>
      </div>
    )
  }
}

export default ClientsPage
