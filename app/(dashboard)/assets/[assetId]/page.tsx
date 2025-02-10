import { ImageGallery } from '@/components/image-gallery'
import { getAssetDetails } from '../actions'
import { PropertyDetailsCard } from '@/components/property-details-card'
import ClientDetailsCard from '@/components/clients/client-details-card'

interface Props {
  params: {
    assetId: string
  }
}

const PropertyDetailsPage = async ({ params }: Props) => {
  const response = await getAssetDetails(params.assetId)
  console.log(response)

  return (
    <div>
      {response.asset && (
        <PropertyDetailsCard
          data={response.asset}
          activeTenant={response?.activeTenant?.client!!}
        >
          <ClientDetailsCard client={response.activeTenant?.client!!} />
        </PropertyDetailsCard>
      )}

      {response.images && (
        <div className='col-span-2 rounded-md border p-5 mt-2'>
          <p className='font-semibold text-lg'>Property Images</p>
          {response.images.length ? (
            <ImageGallery
              images={response.images?.map(item => item.path) ?? []}
            />
          ) : (
            <p className='text-gray-600 text-sm mt-4'>no images found</p>
          )}
        </div>
      )}
    </div>
  )
}

export default PropertyDetailsPage
