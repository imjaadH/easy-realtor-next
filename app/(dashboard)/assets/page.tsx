import { auth } from '@/lib/auth'
import { columns } from './columns'
import { DataTable } from './data-table'
import { getAllAssets } from './actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HomeIcon } from 'lucide-react'

const AssetsPage = async () => {
  const session = await auth()
  if (session?.user) {
    const response = await getAllAssets(session.user?.id!, 50)
    return (
      <div className='mx-auto flex flex-col gap-3  h-full p-4  '>
        <p className='text-2xl font-semibold'>Manage Units</p>

        <div className='flex justify-end'>
          <Link href={'/assets/create'}>
            <Button>
              Add new property
              <HomeIcon />
            </Button>
          </Link>
        </div>
        <section className=' mx-auto w-full overflow-auto'>
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
