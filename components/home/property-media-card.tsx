import { getAssetMedia } from '@/app/(dashboard)/assets/actions'
import { auth } from '@/lib/auth'
import noImageAvailable from '@/public/images/no-image.jpg'
import Image from 'next/image'

import { Session } from 'next-auth'
import ImageSwiper from './image-swiper'
type Props = {
  assetId: string
  session: Session
}
const PropertyMediaContainer = async ({ assetId, session }: Props) => {
  if (!session?.user) {
    return <div>please login first</div>
  }
  const response = await getAssetMedia(assetId)

  if (!response.length)
    return <Image alt='no-media' src={noImageAvailable} fill />
  return <ImageSwiper images={response} />
}

export default PropertyMediaContainer
