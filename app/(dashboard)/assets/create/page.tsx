import { SessionProvider } from 'next-auth/react'
import CreateAsset from '@/components/create-asset'

type Props = {}
export const CreateAssetPage = async ({}: Props) => {
  return (
    <SessionProvider>
      <div>
        <div className='p-5'>
          <h3 className='text-2xl font-semibold'>Your Estate</h3>
          <p className='text-gray-500'>manage your properties here</p>
          <CreateAsset />
        </div>
      </div>
    </SessionProvider>
  )
}

export default CreateAssetPage
