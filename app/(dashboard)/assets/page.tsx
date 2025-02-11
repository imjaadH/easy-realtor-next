import { auth } from '@/lib/auth'
import { columns } from './columns'
import { DataTable } from './data-table'
import { getAllAssets } from './actions'

type Props = {}
const AssetsPage = async ({}: Props) => {
  const session = await auth()
  if (session?.user) {
    const response = await getAllAssets(session.user?.id!, 15)
    return (
      <div className='mx-auto flex flex-col gap-3  h-full p-4  '>
        <p className='text-2xl font-semibold'>Manage Units</p>
        <section className='mt-6 mx-auto w-full overflow-auto'>
          <DataTable
            columns={columns}
            data={JSON.parse(JSON.stringify(response))}
          />
        </section>
      </div>
    )
  }
}

export default AssetsPage
