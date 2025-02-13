import { auth } from '@/lib/auth'
import { getAllContracts } from './actions'
import ContractsTable from '@/components/contract/contracts-table'

type Props = {}
const ContractsPage = async ({}: Props) => {
  const session = await auth()
  if (session?.user) {
    const response = await getAllContracts(session?.user?.id!)
    return (
      <div className='mx-auto flex flex-col gap-3  h-full p-4  '>
        <p className='text-2xl font-semibold'>Manage Contracts</p>
        <section className='mt-6 mx-auto w-full '>
          <ContractsTable contracts={response} session={session} />
        </section>
      </div>
    )
  }
}
export default ContractsPage
