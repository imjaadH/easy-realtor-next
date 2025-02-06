import { AssetForm } from '@/components/forms/create-asset-form'

type Props = {}
export const CreateAsset = ({}: Props) => {
  return (
    <div>
      <div className='p-5'>
        <h3 className='text-2xl font-semibold'>Your Estate</h3>
        <p className='text-gray-500'>manage your properties here</p>
        <section className='mt-6 mx-auto grid grid-cols-3'>
          <AssetForm />
        </section>
      </div>
    </div>
  )
}

export default CreateAsset
