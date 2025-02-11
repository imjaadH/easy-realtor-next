import { auth } from '@/lib/auth'

import { getClients } from './actions'
import UpdateClient from '@/components/clients/update-client'
import ClientsTable from '@/components/clients/clients-table'

type Props = {}
const ClientsPage = async ({}: Props) => {
  const session = await auth()
  if (session?.user) {
    const response = await getClients(session.user?.id!!, 10)
    return (
      <div className='mx-auto flex flex-col gap-3 h-screen p-4 '>
        <p className='text-2xl font-semibold'>Manage Clients</p>

        <section className='mt-6 mx-auto w-full '>
          <div className='flex justify-end'>
            <UpdateClient session={session} />
          </div>

          <ClientsTable clients={response} />
        </section>
      </div>
    )
  }
}

export default ClientsPage
