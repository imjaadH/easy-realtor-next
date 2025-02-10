import { auth } from '@/lib/auth'
import { columns } from './columns'
import { DataTable } from './data-table'
import { getClients } from './actions'

type Props = {}
const ClientsPage = async ({}: Props) => {
  const session = await auth()
  if (session?.user) {
    const response = await getClients(session.user?.id!!, 10)
    return (
      <div className='mx-auto flex flex-col gap-3 h-screen p-4'>
        <p className='text-2xl font-semibold'>Manage Clients</p>

        <section className='mt-6 mx-auto w-full'>
          <div className='flex justify-end'>{/* <CreateVehicle /> */}</div>
          <DataTable columns={columns} data={response} />
        </section>
      </div>
    )
  }
  console.log(session?.user)
}

export default ClientsPage
