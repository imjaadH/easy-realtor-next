import ClientDetailsCard from '@/components/clients/client-details-card'
import { getClientDetails } from '../actions'

interface ClientDetailsProps {
  params: {
    clientId: string
  }
}
const ClientDetailsPage = async ({ params }: ClientDetailsProps) => {
  const response = await getClientDetails(params.clientId)

  return (
    <div className='flex rounded-md border p-4'>
      <ClientDetailsCard client={response!} allowEdit />
    </div>
  )
}

export default ClientDetailsPage
