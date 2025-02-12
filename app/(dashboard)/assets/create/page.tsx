import { SessionProvider } from 'next-auth/react'
import CreateAsset from '@/components/create-asset'

type Props = {}
export const CreateAssetPage = async ({}: Props) => {
  return (
    <SessionProvider>
      <div className='p-5'>
        <h3 className='text-2xl font-semibold'>Add Units</h3>
        <p className='text-gray-500'>add new property here</p>
        <CreateAsset />
      </div>
    </SessionProvider>
  )
}

export default CreateAssetPage
